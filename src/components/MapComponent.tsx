"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import type { Place } from "@prisma/client";
import { bbox } from "@turf/bbox";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	AttributionControl,
	Layer,
	type LayerProps,
	type MapLayerMouseEvent,
	type MapRef,
	Map as ReactMap,
	Source,
} from "react-map-gl/maplibre";

const clusterLayer: LayerProps = {
	id: "clusters",
	type: "circle",
	source: "items",
	filter: ["has", "point_count"],
	paint: {
		"circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
		"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
	},
};

const clusterCountLayer: LayerProps = {
	id: "cluster-count",
	type: "symbol",
	source: "items",
	filter: ["has", "point_count"],
	// layout: {
	// 	// "text-field": ["get", "point_count_abbreviated"],
	// 	// "text-font": ["Open Sans Regular"],
	// 	// "text-size": 12,
	// },
	// paint: {
	// 	"text-color": "#ffffff",
	// },
};

export const unclusteredPointLayer: LayerProps = {
	id: "unclustered-point",
	type: "circle",
	source: "items",
	filter: ["!", ["has", "point_count"]],
	paint: {
		"circle-color": "hsl(24.6, 95%, 53.1%)",
		"circle-radius": 4,
		"circle-stroke-width": 1,
		"circle-stroke-color": "#fff",
	},
};

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
	const [cursor, setCursor] = useState<"move" | "pointer">("move");

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

	const onClick = useCallback(async (event: MapLayerMouseEvent) => {
		const feature = event.features?.[0];
		if (!feature) return;

		const source = map.current?.getSource("source") as unknown as maplibregl.GeoJSONSource;
		if (!source) return;

		const zoom = await source.getClusterExpansionZoom(feature.properties.cluster_id);

		map.current?.flyTo({
			center: (feature.geometry as GeoJSON.Point).coordinates as [number, number],
			zoom,
			duration: 350,
		});
	}, []);

	const onMouseEnter = useCallback(() => setCursor("pointer"), []);
	const onMouseLeave = useCallback(() => setCursor("move"), []);

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
				initialViewState={initialViewState}
				onMove={() => setHasInteracted(true)}
				// onClick={onClick}
				// onMouseEnter={onMouseEnter}
				// onMouseLeave={onMouseLeave}
				// cursor={cursor}
				// interactiveLayerIds={[]}
				reuseMaps
				attributionControl={false}
				dragRotate={false}
				touchZoomRotate={false}
			>
				<Source
					id="items"
					type="geojson"
					data={source}
					cluster={true}
					clusterMaxZoom={12.5}
					clusterRadius={50}
				>
					<Layer {...clusterLayer} />
					{/* <Layer {...unclusteredPointLayer} /> */}
				</Source>
				<AttributionControl compact />
			</ReactMap>
		</div>
	);
}
