import { NYC_NEIGHBORHOODS, isNYCNeighborhood } from "@/lib/nyc-neighborhoods";
import prisma from "@/lib/prisma";
import { anthropic } from "@ai-sdk/anthropic";
import { formatStreamPart, streamText } from "ai";
import { notFound } from "next/navigation";

const DESCRIBE_ANY_PROMPT = `
The user will give you a location from somewhere in the world. Describe this location's vibes exclusively with reference to New York City neighborhoods that the user may be familiar with. Return anywhere up to 3 sentences about the location. Don't say anything about New Yorkers themselves. Say that a neighborhood _is_, not that it 'gives off vibes of'. If you don't know anything about the provided location, respond with "{location} seems to be entirely unique". Bold all neighborhood names with ** markdown.

For reference, here is a list of NYC neighborhoods: ${Object.values(NYC_NEIGHBORHOODS)
	.map((n) => n.name)
	.join(", ")}
`;

const DESCRIBE_NYC_PROMPT = `
The user will give you a location of a neighborhood in New York City. Describe its vibe in 3 or fewer sentences .
`;

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
	const place = await prisma.place.findUnique({
		where: { id },
		select: { id: true, description: true, fullAddress: true },
	});

	if (!place) notFound();

	if (place.description !== null) {
		return new Response(formatStreamPart("text", place.description), {
			status: 200,
			headers: { "Content-Type": "text/plain" },
		});
	}

	const result = await streamText({
		model: anthropic("claude-3-5-sonnet-20240620"),
		messages: [
			{
				role: "system",
				content: isNYCNeighborhood(place.id) ? DESCRIBE_NYC_PROMPT : DESCRIBE_ANY_PROMPT,
			},
			{ role: "user", content: place.fullAddress },
		],
		async onFinish({ text, finishReason, usage }) {
			// cache if valid stop
			if (finishReason === "stop" && text) {
				await prisma.place.update({
					where: { id },
					data: { description: text },
				});
			}
		},
	});

	return result.toTextStreamResponse();
}
