import { NeighborhoodList, NeighborhoodListSkeleton } from "@/components/neighborhood-list";
import { getRecentNeighborhoods } from "@/lib/get-recent-neighborhoods";
import { Suspense } from "react";

async function RecentNeighborhoodsLoader() {
	const neighborhoods = await getRecentNeighborhoods();
	return <NeighborhoodList neighborhoods={neighborhoods} />;
}

export async function RecentNeighborhoods() {
	return (
		<Suspense fallback={<NeighborhoodListSkeleton />}>
			<RecentNeighborhoodsLoader />
		</Suspense>
	);
}
