import { NeighborhoodListSkeleton } from "@/components/neighborhood-list";
import { Pill } from "@/components/pill";
import { getRecentNeighborhoods } from "@/lib/get-recent-neighborhoods";
import { getPlaceSlug } from "@/lib/slugs";
import { Suspense } from "react";

async function RecentNeighborhoodsLoader() {
	const neighborhoods = await getRecentNeighborhoods({ limit: 5 });
	return (
		<div className="flex flex-row flex-wrap gap-2">
			{neighborhoods.map((n) => (
				<Pill key={n.id} href={`/${getPlaceSlug(n)}`}>
					{n.name}, {n.placeFormatted}
				</Pill>
			))}
		</div>
	);
}

export async function RecentNeighborhoods() {
	return (
		<Suspense fallback={<NeighborhoodListSkeleton />}>
			<RecentNeighborhoodsLoader />
		</Suspense>
	);
}
