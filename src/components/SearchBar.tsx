"use client";

import { getNeighborhoodSlug } from "@/lib/slugs";
import { cn } from "@/lib/utils";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useOnClickOutside } from "usehooks-ts";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Skeleton } from "./ui/skeleton";

export function SearchBar({ className }: { className?: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const input = useRef<HTMLInputElement>(null);
	const root = useRef<HTMLDivElement>(null);

	const [show, setShow] = useState(false);
	useOnClickOutside(root, () => setShow(false));

	const [query, setQuery] = useState("");
	const [debouncedQuery] = useDebounce(query, 500);

	const search = useMemo(
		() => new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN }),
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

	const items = useMemo(() => {
		if (!show) return null;

		if (debouncedQuery.length === 1) {
			return (
				<CommandEmpty>
					<span className="text-muted-foreground">Type at least one more character...</span>
				</CommandEmpty>
			);
		}

		if (isLoading) {
			return (
				<CommandEmpty className="flex flex-col gap-1 p-2">
					<Skeleton className="h-4 w-64" />
					<Skeleton className="h-3 w-48" />
				</CommandEmpty>
			);
		}
		if (error) {
			return <CommandEmpty>Something went wrong... </CommandEmpty>;
		}

		if (data?.suggestions.length === 0) {
			return (
				<CommandEmpty>
					<span className="text-muted-foreground">Nothing found for "{debouncedQuery}"</span>
				</CommandEmpty>
			);
		}

		return data?.suggestions.map(({ mapbox_id, name, place_formatted }) => (
			<CommandItem
				key={mapbox_id}
				onSelect={() => {
					router.push(
						`/${getNeighborhoodSlug({ id: mapbox_id, name })}?${new URLSearchParams({ st: sessionToken.toString() })}`,
					);
					setQuery(name);
					input.current?.blur();
					setShow(false);
				}}
				value={mapbox_id}
			>
				<div className="flex flex-col gap-1">
					<span className="font-bold text-md">{name}</span>
					<span className="text-sm text-muted-foreground">{place_formatted}</span>
				</div>
			</CommandItem>
		));
	}, [show, data, isLoading, error, debouncedQuery, router, sessionToken]);

	return (
		<Command ref={root} shouldFilter={false} className={cn(className, "h-auto w-full", "relative")}>
			<CommandInput
				ref={input}
				value={query}
				onValueChange={setQuery}
				placeholder="Search for any neighborhood"
				onFocus={() => setShow(true)}
				className="text-md h-14"
				icon={
					pathname === "/" ? undefined : (
						<Link href="/">
							<ArrowLeft className="h-4 w-4 shrink-0" />
						</Link>
					)
				}
			/>

			<CommandList className="absolute top-full left-0 right-0 z-10 rounded-xl shadow-xl mt-4">
				{items}
			</CommandList>
		</Command>
	);
}
