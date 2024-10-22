import { LocationDescription } from "@/components/LocationDescription";
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
	if (params.slug === "installHook.js.map") notFound();

	const sessionToken = searchParams.st as string;
	const id = getSlugId(params.slug);
	if (!id) notFound();

	const [neighborhood, geometry] = await getOrRetrieveNeighborhood(id, sessionToken);

	const source = toFeatureCollection(toFeature(id, geometry));

	return (
		<>
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<h1 className="text-3xl font-heading font-semibold mb-2">{neighborhood.name}</h1>
			<LocationDescription id={id} initialData={neighborhood.description ?? undefined} />
		</>
	);
}
