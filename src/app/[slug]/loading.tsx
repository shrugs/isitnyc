import { LocationDescriptionSkeleton } from "@/components/LocationDescription";
import { LocationTagsSkeleton } from "@/components/location-tags/loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<>
			{/* map */}
			<Skeleton className="w-full aspect-video rounded-lg" />
			<div className="flex flex-col">
				<Skeleton className="h-[1.875rem] mb-[0.375rem] w-64" />
				<Skeleton className="h-[1.5rem] w-[24rem]" />
			</div>
			{/* Tags */}
			<LocationTagsSkeleton />
			{/* description */}
			<LocationDescriptionSkeleton />
		</>
	);
}
