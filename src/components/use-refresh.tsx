"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function UseRefresh({ ms = 5000 }: { ms?: number } = {}) {
	const router = useRouter();

	useEffect(() => {
		const interval = setInterval(() => {
			router.refresh();
		}, ms);
		return () => clearInterval(interval);
	}, [router, ms]);

	return null;
}
