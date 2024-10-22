import { getTags } from "@/lib/get-tags";
import { NYC_NEIGHBORHOODS } from "@/lib/nyc-neighborhoods";
import type { Tag } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";

const LocationTagCell = ({
	top,
	bottom,
	weight,
}: { top: React.ReactNode; bottom: React.ReactNode; weight: number }) => (
	<div
		className="rounded-xl py-2 px-3 flex flex-col bg-accent accent-foreground truncate transition-[flex] duration-300 ease-in-out"
		style={{ flex: weight }}
	>
		<span className="text-xs font-semibold font-heading truncate">{top}</span>
		<span className="text-sm">{bottom}</span>
	</div>
);

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

export async function LocationTags({ id, initialData }: { id: string; initialData: Tag[] }) {
	const tags = initialData.length > 0 ? initialData : await getTags(id);

	return (
		<div className="w-full flex flex-row flex-nowrap overflow-x-hidden gap-px bg-muted border rounded-2xl p-1">
			{tags.length === 0 && (
				<LocationTagCell
					top={<span className="font-mono">¯\_(ツ)_/¯</span>}
					bottom="100%"
					weight={100}
				/>
			)}
			{tags.map((tag) => (
				<LocationTagCell
					key={tag.like}
					top={NYC_NEIGHBORHOODS[tag.like].name}
					bottom={`${tag.weight}%`}
					weight={tag.weight}
				/>
			))}
		</div>
	);
}
