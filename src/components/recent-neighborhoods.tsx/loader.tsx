import { getRecentNeighborhoods } from "@/app/api/recent/route";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import RenderRecentNeighborhoods from "./renderer";

export function RecentNeighborhoodsSkeleton() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="aspect-video w-full rounded-xl" />
			<ul className="flex flex-col gap-1">
				<li>
					<Skeleton className="h-12 w-full" />
				</li>
				<li>
					<Skeleton className="h-12 w-full" />
				</li>
				<li>
					<Skeleton className="h-12 w-full" />
				</li>
				<li>
					<Skeleton className="h-12 w-full" />
				</li>
				<li>
					<Skeleton className="h-12 w-full" />
				</li>
			</ul>
		</div>
	);
}

async function RecentNeighborhoodsLoader() {
	const fallbackData = await getRecentNeighborhoods();
	return <RenderRecentNeighborhoods fallbackData={fallbackData} />;
}

export async function RecentNeighborhoods() {
	return (
		<Suspense fallback={<RecentNeighborhoodsSkeleton />}>
			<RecentNeighborhoodsLoader />
		</Suspense>
	);
}
