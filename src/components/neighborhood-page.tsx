import type { SimpleTag } from "@/lib/get-tags";
import { getGeometry } from "@/lib/postgis-helpers";
import type { Place } from "@prisma/client";
import type { ComponentProps } from "react";
import { LocationDescription } from "./LocationDescription";
import { LocationTags } from "./location-tags/loader";
import MapComponent from "./map/MapComponent";

export async function NeighborhoodPage({
	neighborhood,
}: {
	neighborhood: Pick<Place, "id" | "name" | "description" | "placeFormatted">;
}) {
	const geometry = await getGeometry(neighborhood.id);
	const source: ComponentProps<typeof MapComponent>["source"] = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				id: neighborhood.id,
				// biome-ignore lint/style/noNonNullAssertion: id guaranteed to exist and have geometry
				geometry: geometry!,
				properties: neighborhood,
			},
		],
	};

	return (
		<>
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<div className="flex flex-col">
				<h1 className="text-3xl font-heading font-semibold">{neighborhood.name}</h1>
				<h2 className="text-md font-body">{neighborhood.placeFormatted}</h2>
			</div>
			<LocationTags id={neighborhood.id} />
			<LocationDescription
				id={neighborhood.id}
				initialData={neighborhood.description ?? undefined}
			/>
		</>
	);
}
