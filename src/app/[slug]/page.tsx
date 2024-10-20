import MapComponent from "@/components/MapComponent";
import { getOrRetrieveNeighborhood } from "@/lib/get-neighborhood";
import { toFeature, toFeatureCollection } from "@/lib/postgis-helpers";
import { getSlugId } from "@/lib/slugs";
import { notFound } from "next/navigation";

export default async function NeighborhoodPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const sessionToken = searchParams.st as string;
	const id = getSlugId(params.slug);
	if (!id) notFound();

	const [neighborhood, geometry] = await getOrRetrieveNeighborhood(id, sessionToken);

	const source = toFeatureCollection(toFeature(id, geometry));

	return (
		<main className="flex flex-col items-start gap-4">
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<h1 className="text-3xl font-heading font-semibold mb-2">{neighborhood.name}</h1>
			{neighborhood.description && <p className="text-lg mb-4">{neighborhood.description}</p>}
			<p className="text-lg">here is some normal body text</p>
			<div className="mb-4">
				<h2 className="text-xl font-heading font-bold mb-2">Tags</h2>
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
