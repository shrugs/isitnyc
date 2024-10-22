import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<>
			<Skeleton className="w-full aspect-video rounded-lg" />
			<Skeleton className="h-6 w-64" />
		</>
	);
}
