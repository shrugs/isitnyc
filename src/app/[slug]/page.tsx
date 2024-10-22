import { LocationDescription } from "@/components/LocationDescription";
import { LocationTags, LocationTagsSkeleton } from "@/components/LocationTags";
import MapComponent from "@/components/MapComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrRetrieveNeighborhood } from "@/lib/get-neighborhood";
import { toFeature, toFeatureCollection } from "@/lib/postgis-helpers";
import { getSlugId } from "@/lib/slugs";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function NeighborhoodPage({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// just a very annoying log in dev
	if (params.slug === "installHook.js.map") notFound();

	const sessionToken = searchParams.st as string;
	const id = getSlugId(params.slug);
	if (!id) notFound();

	const [neighborhood, geometry] = await getOrRetrieveNeighborhood(id, sessionToken);

	const source = toFeatureCollection(toFeature(id, geometry));

	const place = (neighborhood.properties as GeoJSON.GeoJsonProperties)?.place_formatted;

	return (
		<>
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<div className="flex flex-col">
				<h1 className="text-3xl font-heading font-semibold">{neighborhood.name}</h1>
				<h2 className="text-md font-body">{place}</h2>
			</div>
			<Suspense fallback={<LocationTagsSkeleton />}>
				<LocationTags id={id} initialData={neighborhood.tags} />
			</Suspense>
			{/* <LocationDescriptionSkeleton /> */}
			<LocationDescription id={id} initialData={neighborhood.description ?? undefined} />
		</>
	);
}
