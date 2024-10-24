import { isNYCNeighborhood } from "@/lib/nyc-neighborhoods";
import prisma from "@/lib/prisma";
import { anthropic } from "@ai-sdk/anthropic";
import { Like, type Tag } from "@prisma/client";
import { type CoreMessage, TypeValidationError, generateObject } from "ai";
import { notFound } from "next/navigation";
import { z } from "zod";

export type SimpleTag = Pick<Tag, "like" | "weight">;

async function _generateTags(messages: CoreMessage[]): Promise<SimpleTag[]> {
	const { object } = await generateObject({
		model: anthropic("claude-3-5-sonnet-20240620"),
		schema: z.object({
			tags: z
				.array(
					z.object({
						like: z
							.enum(Object.values(Like) as [`${Like}`])
							.describe(
								"An NYC neighborhood identifier. MUST be EXACTLY one of the provided values.",
							),
						weight: z
							.number()
							.int()
							.describe(
								"An integer percentage (e.g. 50% is 50) indicating the relative weight of this NYC neighborhood towwards the overall vibe of the user-provided neighborhood.",
							),
					}),
				)
				.describe(
					`A set of tags indicating which NYC neighborhoods the user's provided location is similar to, from a vibe perspective, along with an associated weighting of its relevance to the overall vibe of that location. The provided weights should add up to 100.`,
				),
		}),
		messages,
	});

	return object.tags;
}

async function generateTags(address: string): Promise<SimpleTag[]> {
	console.log(`Generating Tags: ${address}`);
	let count = 0;
	const messages: CoreMessage[] = [
		// TODO: system prompt?
		// { role: "system", content: TAG_PROMPT },
		{ role: "user", content: address },
	];

	while (count < 3) {
		try {
			const tags = await _generateTags(messages);
			console.log(`↳ [${tags.map((t) => t.like).join(", ")}]`);
			return tags;
		} catch (error) {
			count++;

			if (error instanceof TypeValidationError) {
				// retry
				console.log(`⚠️ ${count} failed: ${address}`);
				messages.push({ role: "assistant", content: String(error.value) });
				messages.push({
					role: "user",
					content: `That provided the following error: ${error.message}`,
				});
			} else {
				throw error;
			}
		}
	}

	throw new Error(`Could not generate tags for ${address}`);

	// TODO: reweight?
}

export async function getTags(id: string): Promise<SimpleTag[]> {
	const place = await prisma.place.findUnique({
		where: { id },
		select: { id: true, fullAddress: true, tags: true },
	});

	if (!place) notFound();

	// if cached, return cache
	if (place.tags.length > 0) {
		return place.tags;
	}

	// if nyc neighborhood, 100% itself
	const nyc = isNYCNeighborhood(place.id);
	if (nyc) {
		// store these tags in db as well to prevent FOLC
		const tag = await prisma.tag.create({
			data: { like: nyc.like, weight: 100, placeId: id },
		});
		return [tag];
	}

	// otherwise, fetch from ai
	try {
		const tags = await generateTags(place.fullAddress);

		// save/cache
		await prisma.tag.createMany({
			data: tags.map((tag) => ({ placeId: id, ...tag })),
		});

		return tags;
	} catch (error) {
		console.error(error);
		// idk, we weren't able to generate tags, so fuck it
		return [];
	}
}
