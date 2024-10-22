"use client";

import { useTextStream } from "@/lib/use-text-stream";

export function LocationDescription({ id, initialData }: { id: string; initialData?: string }) {
	const { text, isLoading, error } = useTextStream(`/api/describe/${id}`, initialData);

	if (error) {
		return <p className="text-lg">There was an error generating this description.</p>;
	}

	return <p className="text-lg">{text}</p>;
}
