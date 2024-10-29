import { type SimpleTag, getTags } from "@/lib/get-tags";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { LocationTagCell } from "./cell";
import { RenderLocationTags } from "./renderer";

export function LocationTagsSkeleton() {
	return (
		<div className="w-full flex flex-row flex-nowrap gap-px bg-muted border rounded-2xl p-1">
			<LocationTagCell
				top={<Skeleton className="h-[0.75rem] mb-[0.25rem]" />}
				bottom={<Skeleton className="h-[1.25rem]" />}
				weight={4}
			/>
			<LocationTagCell
				top={<Skeleton className="h-[0.75rem] mb-[0.25rem]" />}
				bottom={<Skeleton className="h-[1.25rem]" />}
				weight={3}
			/>
			<LocationTagCell
				top={<Skeleton className="h-[0.75rem] mb-[0.25rem]" />}
				bottom={<Skeleton className="h-[1.25rem]" />}
				weight={1}
			/>
			<LocationTagCell
				top={<Skeleton className="h-[0.75rem] mb-[0.25rem]" />}
				bottom={<Skeleton className="h-[1.25rem]" />}
				weight={1}
			/>
			<LocationTagCell
				top={<Skeleton className="h-[0.75rem] mb-[0.25rem]" />}
				bottom={<Skeleton className="h-[1.25rem]" />}
				weight={1}
			/>
		</div>
	);
}

async function Loader({ id, initialData }: { id: string; initialData: SimpleTag[] }) {
	const tags = initialData || (await getTags(id));

	return <RenderLocationTags tags={tags} />;
}

export function LocationTags(props: React.ComponentProps<typeof Loader>) {
	return (
		<Suspense fallback={<LocationTagsSkeleton />}>
			<Loader {...props} />
		</Suspense>
	);
}
