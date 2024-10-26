import type { ComponentProps } from "react";
import MapComponent from "../MapComponent";
import { Skeleton } from "../ui/skeleton";

export function CityMapSkeleton() {
	return <Skeleton className="w-full aspect-video rounded-xl" />;
}

export function RenderCityMap({ source }: Pick<ComponentProps<typeof MapComponent>, "source">) {
	return (
		<MapComponent className="aspect-video w-full rounded-xl overflow-hidden" source={source} />
	);
}
