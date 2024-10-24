"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import type { Place } from "@prisma/client";
import { bbox } from "@turf/bbox";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { AttributionControl, type MapRef, Map as ReactMap, Source } from "react-map-gl/maplibre";
import { Marker } from "./Marker";

export default function MapComponent({
	source,
	className,
}: {
	source: GeoJSON.FeatureCollection<
		GeoJSON.Geometry,
		Pick<Place, "id" | "name" | "placeFormatted">
	>;
	className?: string;
}) {
	const { resolvedTheme } = useTheme();
	const map = useRef<MapRef>(null);
	const [hasInteracted, setHasInteracted] = useState(false);

	const markers = useMemo(
		() => source.features.map((feature) => <Marker key={feature.id} feature={feature} />),
		[source],
	);

	const bounds = useMemo(() => bbox(source) as [number, number, number, number], [source]);

	useEffect(() => {
		if (hasInteracted) return;
		requestAnimationFrame(() => {
			map.current?.fitBounds(bounds, { padding: 30, maxZoom: 12.5, maxDuration: 2000 });
		});
	}, [hasInteracted, bounds]);

	const initialViewState =
		source.features.length === 0
			? undefined
			: source.features.length === 1
				? {
						longitude: (source.features[0].geometry as GeoJSON.Point).coordinates[0],
						latitude: (source.features[0].geometry as GeoJSON.Point).coordinates[1],
						zoom: 12.5,
					}
				: {
						bounds,
						fitBoundsOptions: { padding: 30 },
					};

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
				initialViewState={initialViewState}
				onMove={() => setHasInteracted(true)}
				interactiveLayerIds={["markers"]}
				reuseMaps
				attributionControl={false}
			>
				<Source id="markers" type="geojson" data={source}>
					{markers}
				</Source>
				<AttributionControl compact />
			</ReactMap>
		</div>
	);
}
