"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import {
	AttributionControl,
	type MapRef,
	Marker,
	Map as ReactMap,
	Source,
} from "react-map-gl/maplibre";
import Pin from "./Pin";

export default function MapComponent({
	source,
	className,
}: { source: GeoJSON.FeatureCollection; className?: string }) {
	const { resolvedTheme } = useTheme();
	const map = useRef<MapRef>(null);

	const markers = useMemo(
		() =>
			source.features.map((feature) => (
				<Marker
					key={`${feature.properties?.city}, ${feature.properties?.country}`}
					longitude={(feature.geometry as GeoJSON.Point).coordinates[0]}
					latitude={(feature.geometry as GeoJSON.Point).coordinates[1]}
					anchor="bottom"
				>
					<Pin />
				</Marker>
			)),
		[source],
	);

	const [longitude, latitude] = (source.features[0].geometry as GeoJSON.Point).coordinates;

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
				initialViewState={{
					zoom: 12.5,
					latitude,
					longitude,
				}}
				reuseMaps
				attributionControl={false}
			>
				<Source id="neighborhood" type="geojson" data={source}>
					{markers}
				</Source>
				<AttributionControl compact />
			</ReactMap>
		</div>
	);
}
