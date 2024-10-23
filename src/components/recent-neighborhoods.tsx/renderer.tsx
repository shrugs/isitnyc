"use client";

import type { RecentResponse } from "@/app/api/recent/route";
import { fetcher } from "@/lib/fetcher";
import { getNeighborhoodSlug } from "@/lib/slugs";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import MapComponent from "../MapComponent";
import { RenderLocationTags } from "../location-tags/renderer";
import { Button } from "../ui/button";

export default function RenderRecentNeighborhoods({
	fallbackData,
}: { fallbackData: RecentResponse }) {
	const { data, size, setSize, isLoading, error } = useSWRInfinite<RecentResponse>(
		(pageIndex, previousPageData) => {
			// reached the end
			if (previousPageData && previousPageData.nextCursor === null) return null;

			// fetch initial page
			if (pageIndex === 0 || !previousPageData) return "/api/recent?limit=10";

			// fetch next page
			return `/api/recent?cursor=${previousPageData.nextCursor}&limit=10`;
		},
		fetcher,
		{
			fallbackData: [fallbackData],
			revalidateFirstPage: false,
		},
	);

	const neighborhoods = useMemo(() => (data ?? []).flatMap((page) => page.neighborhoods), [data]);

	const source = useMemo<GeoJSON.FeatureCollection>(
		() => ({
			type: "FeatureCollection",
			features: neighborhoods.map((n) => ({
				type: "Feature",
				id: n.id,
				properties: {},
				geometry: n.geometry,
			})),
		}),
		[neighborhoods],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setSize((size) => size + 1);
		}, 5000);
		return () => clearInterval(interval);
	}, [setSize]);

	return (
		<div className="flex flex-col w-full gap-2">
			<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
			<ul className="flex flex-col gap-1 w-full">
				{neighborhoods.map((n) => (
					<li key={n.id}>
						<Button variant="ghost" size="auto" className="p-4 rounded-lg" asChild>
							<Link href={`/${getNeighborhoodSlug(n)}`} className="w-full">
								<div className="flex flex-col w-full gap-1">
									<div className="flex flex-col">
										<span className="text-md font-semibold">{n.name}</span>
										<span className="text-muted-foreground">{n.placeFormatted}</span>
									</div>
									<RenderLocationTags tags={n.tags} />
								</div>
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
