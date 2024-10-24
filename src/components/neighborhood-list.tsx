import { getPlaceSlug } from "@/lib/slugs";
import type { Place, Tag } from "@prisma/client";
import Link from "next/link";
import { RenderLocationTags } from "./location-tags/renderer";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

// TODO: make this match
export function NeighborhoodListSkeleton() {
	return (
		<div className="flex flex-col gap-2">
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

export function NeighborhoodList({
	neighborhoods,
}: {
	neighborhoods: (Pick<Place, "id" | "name" | "placeFormatted"> & {
		tags: Tag[];
	})[];
}) {
	return (
		// NOTE: -mx-4 to visually align content, hover stays outside
		<ul className="flex flex-col gap-1 -mx-4">
			{neighborhoods.map((n) => (
				<li key={n.id}>
					<Button variant="ghost" size="auto" className="p-4 rounded-none md:rounded-lg" asChild>
						<Link href={`/${getPlaceSlug(n)}`} className="w-full">
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
	);
}
