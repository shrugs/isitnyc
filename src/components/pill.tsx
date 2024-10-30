import Link from "next/link";

export function Pill({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="rounded-xl py-2 px-3 flex flex-col bg-accent accent-foreground truncate transition-[flex] duration-300 ease-in-out border-2 border-background hover:border-foreground"
		>
			{children}
		</Link>
	);
}
