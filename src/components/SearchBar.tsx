"use client";

import { getNeighborhoodSlug } from "@/lib/slugs";
import { cn } from "@/lib/utils";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Skeleton } from "./ui/skeleton";

export function SearchBar({ className }: { className?: string }) {
	const router = useRouter();

	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebounce(query, 500);

	const search = useMemo(
		() =>
			new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN }),
		[],
	);
	const sessionToken = useMemo(() => new SessionToken(), []);

	const { data, isLoading, error } = useSWR(
		debouncedQuery.length <= 1 ? null : debouncedQuery,
		(text) =>
			search.suggest(text, {
				sessionToken,
				types: ["neighborhood", "locality"].join(","),
			}),
	);

	if (error) console.error(error);

	return (
		<Command
			shouldFilter={false}
			className={cn(className, "h-auto w-full", "relative")}
		>
			<CommandInput
				value={query}
				onValueChange={setQuery}
				placeholder="Search for any neighborhood"
				// className="rounded-full shadow-md"
			/>

			<CommandList className="absolute top-full left-0 right-0 z-10 rounded-xl shadow-xl mt-4">
				{debouncedQuery.length === 1 && (
					<CommandEmpty>
						<span className="text-muted-foreground">
							Type at least one more character...
						</span>
					</CommandEmpty>
				)}

				{isLoading && (
					<CommandEmpty className="flex flex-col gap-1 p-2">
						<Skeleton className="h-4 w-64" />
						<Skeleton className="h-3 w-48" />
					</CommandEmpty>
				)}

				{!isLoading && data?.suggestions.length === 0 && (
					<CommandEmpty>
						<span className="text-muted-foreground">
							Nothing found for "{query}"
						</span>
					</CommandEmpty>
				)}

				{error && <CommandEmpty>Something went wrong... </CommandEmpty>}

				{data?.suggestions.map(({ mapbox_id, name, place_formatted }) => (
					<CommandItem
						key={mapbox_id}
						onSelect={() =>
							router.push(
								`${getNeighborhoodSlug({ id: mapbox_id, name })}?${new URLSearchParams({ st: sessionToken.toString() })}`,
							)
						}
						value={mapbox_id}
					>
						<div className="flex flex-col gap-1">
							<span className="font-bold text-md">{name}</span>
							<span className="text-sm text-muted-foreground">
								{place_formatted}
							</span>
						</div>
					</CommandItem>
				))}
			</CommandList>
		</Command>
	);
}
