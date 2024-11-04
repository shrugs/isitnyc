import MapComponent from "@/components/map/MapComponent";
import { NeighborhoodList } from "@/components/neighborhood-list";
import { getSimilarNeighborhoods } from "@/lib/get-similar-neighborhoods";
import { NYC_NEIGHBORHOODS } from "@/lib/nyc-neighborhoods";
import { Like } from "@prisma/client";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";

export default async function LikePage(props: { params: Promise<{ neighborhood: Like }> }) {
	const { neighborhood } = await props.params;
	if (!Object.values(Like).includes(neighborhood)) notFound();

	const nycName = NYC_NEIGHBORHOODS[neighborhood].name;
	const neighborhoods = await getSimilarNeighborhoods(neighborhood);

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
			<NeighborhoodList neighborhoods={neighborhoods} />
			<div className="flex flex-col justify-center items-center p-12 border-2 border-dashed rounded-xl text-muted-foreground">
				{neighborhoods.length === 0
					? `We didn't find any neighborhoods like ${nycName} yet—search some neighborhoods above to add them to the database.`
					: "Looking for more? Search some neighborhoods above to add them to the database."}
			</div>
		</div>
	);
}
