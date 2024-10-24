import { CityPage } from "@/components/city-page";
import { NeighborhoodPage } from "@/components/neighborhood-page";
import { getOrRetrievePlace } from "@/lib/get-place";
import { getSlugId } from "@/lib/slugs";
import { PlaceType } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function PlacePage({
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

	const place = await getOrRetrievePlace(id, sessionToken);

	// TODO: if place.placeType === PlaceType.City render CityPage
	// else render NeighborhoodPage

	if (place.placeType === PlaceType.City) return <CityPage city={place} />;

	return <NeighborhoodPage neighborhood={place} />;
}
