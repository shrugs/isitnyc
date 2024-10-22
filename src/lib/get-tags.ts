import { NYC_NEIGHBORHOODS, isNYCNeighborhood } from "@/lib/nyc-neighborhoods";
import prisma from "@/lib/prisma";
import { anthropic } from "@ai-sdk/anthropic";
import { Like, type Tag } from "@prisma/client";
import { generateObject } from "ai";
import { notFound } from "next/navigation";
import { z } from "zod";

const TAG_PROMPT = `
Classify the provided location exclusively with reference to the provided New York City neighborhoods. The provided weights should add up to 100. Exclusively use the following NYC neighborhoods for the 'like' property, without any spaces: ${Object.values(
	NYC_NEIGHBORHOODS,
)
	.map((n) => n.name)
	.join(", ")}
`;

export async function getTags(id: string): Promise<Pick<Tag, "like" | "weight">[]> {
	const neighborhood = await prisma.neighborhood.findUnique({
		where: { id },
		include: { tags: true },
	});

	if (!neighborhood) notFound();

	// if cached, return cache
	if (neighborhood.tags.length > 0) {
		return neighborhood.tags;
	}

	// if nyc neighborhood, 100% itself
	const nyc = isNYCNeighborhood(neighborhood.id);
	if (nyc) {
		// store these tags in db as well to prevent FOLC
		const tag = await prisma.tag.create({
			data: { like: nyc.like, weight: 100, neighborhoodId: id },
		});
		return [tag];
	}

	// otherwise, fetch from ai
	const fullAddress = (neighborhood.properties as { full_address: string })?.full_address;
	const { object } = await generateObject({
		model: anthropic("claude-3-5-sonnet-20240620"),
		output: "array",
		schema: z.object({
			like: z.enum(Object.values(Like) as [`${Like}`]),
			weight: z
				.number()
				.int()
				.describe(
					"An integer percentage (e.g. 50% is 50) indicating the relative weight of this NYC neighborhood towwards the overall vibe of the user-provided neighborhood.",
				),
		}),
		messages: [
			{ role: "system", content: TAG_PROMPT },
			{ role: "user", content: fullAddress },
		],
	});

	// TODO: rebalance?

	// save/cache
	await prisma.tag.createMany({
		data: object.map((t) => ({ neighborhoodId: id, ...t })),
	});

	return object;
}
