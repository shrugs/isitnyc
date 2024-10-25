import { CityPage } from "@/components/city-page";
import { NeighborhoodPage } from "@/components/neighborhood-page";
import { getOrRetrievePlace } from "@/lib/get-place";
import { getSlugId } from "@/lib/slugs";
import { PlaceType } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function PlacePage(props: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ st?: string }>;
}) {
	const { st: sessionToken } = await props.searchParams;
	const { slug } = await props.params;
	// just a very annoying log in dev
	if (slug === "installHook.js.map") notFound();

	const id = getSlugId(slug);
	if (!id) notFound();

	const place = await getOrRetrievePlace(id, sessionToken);

	// TODO: if place.placeType === PlaceType.City render CityPage
	// else render NeighborhoodPage

	if (place.placeType === PlaceType.City) return <CityPage city={place} />;

	return <NeighborhoodPage neighborhood={place} />;
}
