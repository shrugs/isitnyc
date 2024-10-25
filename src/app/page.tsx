import { CityMap } from "@/components/city-map/loader";
import { RecentNeighborhoods } from "@/components/recent-neighborhoods/loader";
import { UseRefresh } from "@/components/use-refresh";
import { LoaderCircle } from "lucide-react";

export default function Home() {
	return (
		<main className="flex flex-col gap-4 w-full">
			<h1 className="text-5xl font-heading text-balance">
				New York City neighborhoods are the lingua franca of urban vibes.
			</h1>
			<h2 className="text-muted-foreground">
				See your neighborhood through the solipsistic lens of a New Yorker.
			</h2>
			<CityMap />
			<h3 className="text-xl font-heading flex flex-row items-center flex-nowrap gap-2">
				<span>Recently queried neighborhoods</span>
				<LoaderCircle className="animate-spin h-4 w-4" />
			</h3>
			<RecentNeighborhoods />

			{/* request new data on this page every 5 seconds */}
			<UseRefresh ms={5_000} />
		</main>
	);
}
