import MapComponent from "@/components/map/MapComponent";
import { NeighborhoodList } from "@/components/neighborhood-list";
import { NYC_NEIGHBORHOODS } from "@/lib/nyc-neighborhoods";
import { appendGeometries } from "@/lib/postgis-helpers";
import prisma from "@/lib/prisma";
import { Like, PlaceType } from "@prisma/client";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";

export default async function LikePage(props: { params: Promise<{ neighborhood: Like }> }) {
	const { neighborhood } = await props.params;
	if (!Object.values(Like).includes(neighborhood)) notFound();

	const nycName = NYC_NEIGHBORHOODS[neighborhood].name;

	// TODO: find tags like Like, pull associated neighborhoods + tags -> <NeighborhoodList />
	const neighborhoodsWithoutGeography = await prisma.place.findMany({
		where: {
			placeType: PlaceType.Neighborhood,
			tags: {
				some: {
					like: neighborhood,
					// weight: { gt: 40 },
				},
			},
		},
		select: { id: true, name: true, placeFormatted: true, tags: true },
	});

	const neighborhoods = await appendGeometries(neighborhoodsWithoutGeography);

	const source: ComponentProps<typeof MapComponent>["source"] = {
		type: "FeatureCollection",
		features: neighborhoods.map((n) => ({
			type: "Feature",
			id: n.id,
			properties: n,
			geometry: n.geometry,
		})),
	};

	return (
		<div className="w-full flex flex-col gap-4">
			<MapComponent
				className="aspect-video w-full rounded-xl overflow-hidden"
				source={source}
				cluster
			/>
			<div className="flex flex-col">
				<h1 className="text-3xl font-heading font-semibold">Neighborhoods like {nycName}</h1>
				<h2 className="text-md font-body">where likeness &gt; 30%</h2>
			</div>
			<NeighborhoodList neighborhoods={neighborhoodsWithoutGeography} />
			{neighborhoods.length === 0 && (
				<div className="flex flex-col justify-center items-center p-12 border-2 border-dashed rounded-xl text-muted-foreground">
					We didn't find any neighborhoods like {nycName}.
				</div>
			)}
		</div>
	);
}
