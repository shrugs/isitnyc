"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { getPlaceSlug } from "@/lib/slugs";
import type { Place } from "@prisma/client";
import { bbox } from "@turf/bbox";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	AttributionControl,
	type LngLat,
	type MapLayerMouseEvent,
	type MapRef,
	Marker,
	Popup,
	Map as ReactMap,
	Source,
} from "react-map-gl/maplibre";
import { Pin } from "./Pin";

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
	const router = useRouter();
	const { resolvedTheme } = useTheme();
	const map = useRef<MapRef>(null);
	const [hasInteracted, setHasInteracted] = useState(false);

	const markers = useMemo(
		() =>
			source.features.map((feature) => (
				<Marker
					key={feature.id}
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
					<Pin />
				</Marker>
			)),
		[source, router],
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

	const [hoverInfo, setHoverInfo] = useState<{
		lngLat: LngLat;
		feature: GeoJSON.Feature;
	} | null>(null);

	const onMouseMove = useCallback((event: MapLayerMouseEvent) => {
		const feature = event.features?.[0];
		if (!feature) return setHoverInfo(null);
		console.log(feature);
		setHoverInfo({ lngLat: event.lngLat, feature });
	}, []);

	console.log(hoverInfo);

	return (
		<div className={className}>
			<ReactMap
				ref={map}
				style={{ width: "100%", height: "100%" }}
				mapStyle={`https://api.protomaps.com/styles/v2/${resolvedTheme}.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
				initialViewState={initialViewState}
				onMove={() => setHasInteracted(true)}
				onMouseMove={onMouseMove}
				interactiveLayerIds={["markers"]}
				reuseMaps
				attributionControl={false}
			>
				<Source id="markers" type="geojson" data={source}>
					{markers}
				</Source>
				{hoverInfo && (
					<Popup
						longitude={hoverInfo.lngLat.lng}
						latitude={hoverInfo.lngLat.lat}
						// offset={[0, -10]}
						closeButton={false}
					>
						hello world
					</Popup>
				)}
				<AttributionControl compact />
			</ReactMap>
		</div>
	);
}
