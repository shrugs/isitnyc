"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { bbox } from "@turf/bbox";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import {
	AttributionControl,
	type MapRef,
	Marker,
	Map as ReactMap,
	Source,
} from "react-map-gl/maplibre";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
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
					key={feature.id}
					longitude={(feature.geometry as GeoJSON.Point).coordinates[0]}
					latitude={(feature.geometry as GeoJSON.Point).coordinates[1]}
					anchor="bottom"
				>
					<Pin />
				</Marker>
			)),
		[source],
	);

	const bounds = useMemo(() => bbox(source) as [number, number, number, number], [source]);

	useEffect(() => {
		requestAnimationFrame(() => {
			map.current?.fitBounds(bounds, { padding: 20, maxZoom: 12.5, maxDuration: 2000 });
		});
	}, [bounds]);

	const initialViewState =
		source.features.length === 1
			? {
					longitude: (source.features[0].geometry as GeoJSON.Point).coordinates[0],
					latitude: (source.features[0].geometry as GeoJSON.Point).coordinates[1],
					zoom: 12.5,
				}
			: {
					bounds,
					padding: { bottom: 20, top: 20, left: 20, right: 20 },
				};

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
				initialViewState={initialViewState}
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
