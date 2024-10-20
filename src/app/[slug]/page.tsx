import MapComponent from "@/components/MapComponent";
import { fetchGeometry } from "@/lib/gis-helpers";
import prisma from "@/lib/prisma";
import { getSlugId } from "@/lib/slugs";
import { notFound } from "next/navigation";

export default async function NeighborhoodPage({
	params,
}: {
	params: { slug: string };
}) {
	const id = getSlugId(params.slug);
	if (!id) notFound();

	const [neighborhood, geometry] = await Promise.all([
		prisma.neighborhood.findUnique({
			where: { id },
			include: { tags: true },
		}),
		fetchGeometry(id),
	]);

	if (!neighborhood) notFound();

	return (
		<main className="flex flex-col items-start p-4">
			<MapComponent source={geometry} />
			<h1 className="text-3xl font-bold mb-2">{neighborhood.name}</h1>
			{neighborhood.description && (
				<p className="text-lg mb-4">{neighborhood.description}</p>
			)}
			<div className="mb-4">
				<h2 className="text-xl font-semibold mb-2">Tags</h2>
				<ul className="list-disc list-inside">
					{neighborhood.tags.map((tag) => (
						<li key={tag.id}>
							{tag.like}: {tag.weight}
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
