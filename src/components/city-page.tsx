import { appendGeometries, getGeometry } from "@/lib/postgis-helpers";
import { prisma } from "@/lib/prisma";
import type { Place } from "@prisma/client";
import type { ComponentProps } from "react";
import MapComponent from "./MapComponent";
import { NeighborhoodList } from "./neighborhood-list";

// TODO: cache this page for at least a few seconds
export async function CityPage({ city }: { city: Pick<Place, "id" | "name" | "placeFormatted"> }) {
	const neighborhoodIds = await prisma.$queryRaw<{ id: string }[]>`
		SELECT p.id
		FROM "Place" p
		WHERE p."placeType" = 'Neighborhood'
		AND ST_Intersects(p.geometry, (SELECT bbox FROM "Place" WHERE id = ${city.id}))
	`;

	// biome-ignore lint/style/noNonNullAssertion: city guaranteed to have point geometry
	const geometry = (await getGeometry(city.id))!;

	const neighborhoodsWithoutGeometry = await prisma.place.findMany({
		where: { id: { in: neighborhoodIds.map((n) => n.id) } },
		select: { id: true, name: true, placeFormatted: true, tags: true },
	});

	const neighborhoods = await appendGeometries(neighborhoodsWithoutGeometry);

	const source: ComponentProps<typeof MapComponent>["source"] = {
		type: "FeatureCollection",
		features: [
			{ type: "Feature", id: city.id, geometry, properties: city },
			...neighborhoods.map<GeoJSON.Feature<GeoJSON.Geometry, (typeof neighborhoods)[number]>>(
				(n) => ({
					type: "Feature",
					id: n.id,
					properties: n,
					geometry: n.geometry,
				}),
			),
		],
	};

	return (
		<div className="w-full flex flex-col gap-4">
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<div className="flex flex-col">
				<h1 className="text-3xl font-heading font-semibold">{city.name}</h1>
				<h2 className="text-md font-body">{city.placeFormatted}</h2>
			</div>
			<NeighborhoodList neighborhoods={neighborhoodsWithoutGeometry} />
			<div className="flex flex-col justify-center items-center p-12 border-2 border-dashed rounded-xl text-muted-foreground">
				{neighborhoods.length === 0
					? `No neighborhoods in ${city.name} yet. `
					: "Looking for another neighborhood? "}
				Search for one above.
			</div>
		</div>
	);
}
