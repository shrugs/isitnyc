"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import {
	type MapRef,
	type MapStyle,
	Marker,
	Map as ReactMap,
	Source,
} from "react-map-gl/maplibre";
import useSWR from "swr";
import Pin from "./Pin";

export default function MapComponent({
	source,
	className,
}: { source: GeoJSON.FeatureCollection; className?: string }) {
	const { resolvedTheme } = useTheme();
	const map = useRef<MapRef>(null);

	const { data: mapStyle } = useSWR<MapStyle>(
		`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.PUBLIC_PROTOMAPS_API_KEY}`,
	);

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

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={mapStyle}
			>
				<Source id="neighborhood" type="geojson" data={source}>
					{markers}
				</Source>
			</ReactMap>
		</div>
	);
}
