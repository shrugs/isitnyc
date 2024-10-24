"use client";

import { getPlaceSlug } from "@/lib/slugs";
import type { Place } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Marker as _Marker } from "react-map-gl/maplibre";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Marker({
	feature,
}: {
	feature: GeoJSON.Feature<GeoJSON.Geometry, Pick<Place, "id" | "name" | "placeFormatted">>;
}) {
	const router = useRouter();

	return (
		<Tooltip delayDuration={0}>
			<_Marker
				longitude={(feature.geometry as GeoJSON.Point).coordinates[0]}
				latitude={(feature.geometry as GeoJSON.Point).coordinates[1]}
				anchor="center"
				onClick={(e) => {
					// If we let the click event propagates to the map, it will immediately close the popup
					// with `closeOnClick: true`
					e.originalEvent.stopPropagation();
					router.push(`/${getPlaceSlug(feature.properties)}`);
				}}
			>
				<TooltipTrigger asChild>
					<span className="relative flex h-3 w-3 cursor-pointer">
						<span className="animate-ping duration-2000 absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
					</span>
				</TooltipTrigger>
			</_Marker>
			<TooltipContent className="shadow-md">{feature.properties.name}</TooltipContent>
		</Tooltip>
	);
}
