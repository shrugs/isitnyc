"use client";

import { useTextStream } from "@/lib/use-text-stream";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "./ui/skeleton";

export function LocationDescriptionSkeleton() {
	return (
		<div className="flex flex-col gap-[0.625rem] w-full">
			<Skeleton className="h-[1.125rem] w-[80%]" />
			<Skeleton className="h-[1.125rem] w-[90%]" />
			<Skeleton className="h-[1.125rem] w-[98%]" />
			<Skeleton className="h-[1.125rem] w-[85%]" />
			<Skeleton className="h-[1.125rem] w-full" />
			<Skeleton className="h-[1.125rem] w-[50%]" />
		</div>
	);
}

export function LocationDescription({ id, initialData }: { id: string; initialData?: string }) {
	const { text, isLoading, error } = useTextStream(`/api/describe/${id}`, initialData);

	if (error) {
		return <p className="text-lg">There was an error generating this description.</p>;
	}

	return (
		<div className="flex flex-col gap-1 w-full">
			<ReactMarkdown className="text-lg prose">{text}</ReactMarkdown>

			{text && !isLoading && (
				<p className="text-xs text-muted-foreground animate-fade-in self-end">
					Description courtesy of Claude 3.5 Sonnet
				</p>
			)}
		</div>
	);
}
