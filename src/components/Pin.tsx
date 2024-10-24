import { forwardRef } from "react";

export const Pin = forwardRef<HTMLElement>(function Pin(props, ref) {
	return (
		<span ref={ref} className="relative flex h-3 w-3 cursor-pointer">
			<span className="animate-ping duration-2000 absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
			<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
		</span>
	);
});
