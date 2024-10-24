import { getRecentNeighborhoods } from "@/lib/get-recent-neighborhoods";
import { Suspense } from "react";
import { NeighborhoodList, NeighborhoodListSkeleton } from "@/components/neighborhood-list";

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
