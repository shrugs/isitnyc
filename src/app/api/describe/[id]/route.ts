import { NYC_NEIGHBORHOODS, isNYCNeighborhood } from "@/lib/nyc-neighborhoods";
import prisma from "@/lib/prisma";
import { anthropic } from "@ai-sdk/anthropic";
import { formatStreamPart, streamText } from "ai";
import { notFound } from "next/navigation";

const DESCRIBE_ANY_PROMPT = `
The user will give you a location from somewhere in the world. Describe this location's vibes exclusively with reference to New York City neighborhoods that the user may be familiar with. Return anywhere up to 3 sentences about the location. Don't say anything about New Yorkers themselves. If you don't know anything about the provided location, respond with "{location} seems to be entirely unique".

For reference, here is a list of NYC neighborhoods: ${Object.values(NYC_NEIGHBORHOODS)
	.map((n) => n.name)
	.join(", ")}
`;

const DESCRIBE_NYC_PROMPT = `
The user will give you a location of a neighborhood in New York City. Describe its vibe in 3 or fewer sentences .
`;

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
	const neighborhood = await prisma.neighborhood.findUnique({ where: { id } });

	if (!neighborhood) notFound();

	if (neighborhood.description !== null) {
		return new Response(formatStreamPart("text", neighborhood.description), {
			status: 200,
			headers: { "Content-Type": "text/plain" },
		});
	}

	const fullAddress = (neighborhood.properties as { full_address: string })?.full_address;

	const result = await streamText({
		model: anthropic("claude-3-sonnet-20240229"),
		messages: [
			{
				role: "system",
				content: isNYCNeighborhood(neighborhood.id) ? DESCRIBE_NYC_PROMPT : DESCRIBE_ANY_PROMPT,
			},
			{ role: "user", content: fullAddress },
		],
		async onFinish({ text, finishReason, usage }) {
			await prisma.neighborhood.update({
				where: { id },
				data: { description: text },
			});
		},
	});

	return result.toTextStreamResponse();
}
