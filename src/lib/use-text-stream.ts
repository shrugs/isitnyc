import { useCallback, useEffect, useRef, useState } from "react";

export function useTextStream(api: string, initialData?: string) {
	const [text, setText] = useState<string | undefined>(initialData);
	const [error, setError] = useState<undefined | Error>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const abortControllerRef = useRef<AbortController | null>(null);

	const submit = useCallback(async () => {
		abortControllerRef.current?.abort();
		abortControllerRef.current = new AbortController();

		try {
			setText(undefined);
			setIsLoading(true);
			setError(undefined);

			const response = await fetch(api, {
				method: "POST",
				signal: abortControllerRef.current.signal,
			});

			if (!response.ok) {
				throw new Error((await response.text()) ?? "Failed to fetch the response.");
			}

			if (response.body == null) {
				throw new Error("The response body is empty.");
			}

			let accumulatedText = "";

			await response.body.pipeThrough(new TextDecoderStream()).pipeTo(
				new WritableStream<string>({
					write(chunk) {
						accumulatedText += chunk;
						setText(accumulatedText);
					},

					close() {
						setIsLoading(false);
					},
				}),
			);
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") return;

			setIsLoading(false);
			setError(error instanceof Error ? error : new Error(String(error)));
		}
	}, [api]);

	useEffect(() => {
		if (initialData) return;
		submit();

		return () => {
			abortControllerRef.current?.abort();
		};
	}, [submit, initialData]);

	return { text, isLoading, error };
}
