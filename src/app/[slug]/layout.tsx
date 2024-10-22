import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex flex-col items-start gap-4">
			<Button variant="ghost" size="icon" className="rounded-full" asChild>
				<Link href="/">
					<ArrowLeft className="h-8 w-8" />
				</Link>
			</Button>
			{children}
		</main>
	);
}
