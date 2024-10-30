import { CityMap } from "@/components/city-map/loader";
import { ListOfLikePills } from "@/components/list-of-like-pills";
import { ListOfMajorCities } from "@/components/list-of-major-cities";
import { RecentNeighborhoods } from "@/components/recent-neighborhoods/loader";
import { UseRefresh } from "@/components/use-refresh";
import { LoaderCircle } from "lucide-react";

export default function Home() {
	return (
		<main className="flex flex-col gap-4 w-full">
			<h1 className="text-5xl font-heading font-semibold text-balance">
				New York City neighborhoods are the lingua franca of urban vibes.
			</h1>
			<h2 className="text-muted-foreground">
				See your neighborhood through the solipsistic lens of a New Yorker.
			</h2>
			<CityMap />
			<h3 className="text-xl font-heading font-semibold flex flex-row items-center flex-nowrap gap-2">
				<span>Recently queried neighborhoods</span>
				<LoaderCircle className="animate-spin h-4 w-4" />
			</h3>
			<RecentNeighborhoods />

			<h3 className="text-xl font-heading font-semibold">Some popular cities</h3>
			<ListOfMajorCities />

			<h3 className="text-xl font-heading font-semibold">
				Or find neighborhoods around the world similar to:
			</h3>
			<ListOfLikePills />

			{/* request new data on this page every 5 seconds */}
			<UseRefresh ms={process.env.NODE_ENV === "development" ? 10_000 : 5_000} />
		</main>
	);
}
