import type { Like } from "@prisma/client";

export const LocationTagCell = ({
	top,
	bottom,
	weight,
	like,
}: { top: React.ReactNode; bottom: React.ReactNode; weight: number; like?: Like }) => {
	return (
		<div
			className="rounded-xl py-2 px-3 flex flex-col bg-accent accent-foreground truncate transition-[flex] duration-300 ease-in-out"
			style={{ flex: weight }}
		>
			<span className="text-xs font-semibold font-heading truncate">{top}</span>
			<span className="text-sm">{bottom}</span>
		</div>
	);
};
