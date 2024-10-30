import Link from "next/link";

export function Pill({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="inline-flex shrink-0 items-center rounded-full border text-xs transition-colors bg-muted border-input text-secondary-foreground shadow-sm hover:shadow-md hover:bg-muted/80 py-1 px-4"
		>
			{children}
		</Link>
	);
}
