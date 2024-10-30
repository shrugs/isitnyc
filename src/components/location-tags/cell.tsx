import type { Like } from "@prisma/client";
import Link from "next/link";

export const LocationTagCell = ({
	top,
	bottom,
	weight,
	like,
	link = false,
}: {
	top: React.ReactNode;
	bottom: React.ReactNode;
	weight: number;
	like?: Like;
	link?: boolean;
}) => {
	function Wrapper({ children }: { children: React.ReactNode }) {
		if (link && like)
			return (
				<Link href={`/like/${like}`} className="w-full group">
					{children}
				</Link>
			);
		return <>{children}</>;
	}

	return (
		<Wrapper>
			<div
				className="rounded-xl py-2 px-3 flex flex-col bg-accent accent-foreground truncate transition-[flex] duration-300 ease-in-out border-2 border-background group-hover:border-foreground"
				style={{ flex: weight }}
			>
				<span className="text-xs font-semibold font-heading truncate">{top}</span>
				<span className="text-sm">{bottom}</span>
			</div>
		</Wrapper>
	);
};
