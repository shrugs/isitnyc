import { ArrowUpRight } from "lucide-react";

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="underline underline-offset-1"
		>
			{children}
			<ArrowUpRight className="inline h-2 w-2 align-middle" />
		</a>
	);
}
