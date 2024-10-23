import { RecentNeighborhoods } from "@/components/recent-neighborhoods.tsx/loader";

export default function Home() {
	return (
		<main className="flex flex-col gap-4 w-full">
			<h1 className="text-5xl font-heading text-balance">
				New York City neighborhoods are the lingua franca of urban vibes.
			</h1>
			<h2 className="text-muted-foreground">Even the LLMs think so.</h2>
			<RecentNeighborhoods />
		</main>
	);
}
