import { getOrRetrievePlace } from "@/lib/get-place";
import { getSlugId } from "@/lib/slugs";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "a meta image showing the place's name and perhaps its tags";
export const size = { width: 1280, height: 720 };
export const contentType = "image/png";

const getFont = (url: URL) => fetch(url).then((res) => res.arrayBuffer());

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const [fontHeader, fontBody] = await Promise.all([
		getFont(new URL("@/fonts/Fraunces/Fraunces_72pt-SemiBold.ttf", import.meta.url)),
		getFont(new URL("@/fonts/Source_Serif_4/SourceSerif4_18pt-Regular.ttf", import.meta.url)),
	]);

	const { slug } = await params;
	const id = getSlugId(slug);
	if (!id) notFound();

	const place = await getOrRetrievePlace(id);
	if (!place) notFound();

	return new ImageResponse(
		<div
			tw="w-full h-full flex items-center justify-center"
			style={{
				background: "hsl(50, 25%, 95%)",
				color: "hsl(50, 20%, 20%)",
				fontFamily: "Source Serif 4",
				fontWeight: 400,
			}}
		>
			{slug}
		</div>,
		{
			...size,
			fonts: [
				{
					name: "Fraunces",
					data: fontHeader,
					style: "normal",
					weight: 600,
				},
				{
					name: "Source Serif 4",
					data: fontBody,
					style: "normal",
					weight: 400,
				},
			],
		},
	);
}
