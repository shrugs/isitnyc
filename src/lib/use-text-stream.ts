import { useCallback, useEffect, useState } from "react";

export function useTextStream(api: string, initialData?: string) {
	const [text, setText] = useState<string | undefined>(initialData);
	const [error, setError] = useState<undefined | Error>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const submit = useCallback(async () => {
		try {
			setText(undefined);
			setIsLoading(true);
			setError(undefined);

			const response = await fetch(api, { method: "POST" });

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
			setIsLoading(false);
			setError(error instanceof Error ? error : new Error(String(error)));
		}
	}, [api]);

	useEffect(() => {
		if (initialData) return;
		submit();
	}, [submit, initialData]);

	return { text, isLoading, error };
}
