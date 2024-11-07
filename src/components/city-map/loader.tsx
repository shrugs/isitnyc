import { appendGeometries } from "@/lib/postgis-helpers";
import { prisma } from "@/lib/prisma";
import { PlaceType } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { type ComponentProps, Suspense } from "react";
import type MapComponent from "../map/MapComponent";
import { CityMapSkeleton, RenderCityMap } from "./renderer";

const getCities = unstable_cache(
	async () => {
		const citiesWithoutGeometry = await prisma.place.findMany({
			where: { placeType: PlaceType.City },
			select: { id: true, name: true, placeFormatted: true },
		});

		return await appendGeometries(citiesWithoutGeometry);
	},
	["all-cities"],
	{ revalidate: 60 },
);

async function CityMapLoader() {
	const cities = await getCities();

	const source: ComponentProps<typeof MapComponent>["source"] = {
		type: "FeatureCollection",
		features: cities.map((city) => ({
			type: "Feature",
			id: city.id,
			geometry: city.geometry,
			properties: city,
		})),
	};

	return <RenderCityMap source={source} />;
}

export async function CityMap() {
	return (
		<Suspense fallback={<CityMapSkeleton />}>
			<CityMapLoader />
		</Suspense>
	);
}
