import { LIKES_SANS_UNKNOWN } from "@/lib/like";
import { NYC_NEIGHBORHOODS } from "@/lib/nyc-neighborhoods";
import type { Like } from "@prisma/client";
import { Pill } from "./pill";

export function ListOfLikePills() {
	return (
		<div className="flex flex-row flex-wrap gap-2">
			{LIKES_SANS_UNKNOWN.map((like) => (
				<Pill key={like} href={`/like/${like}`}>
					{NYC_NEIGHBORHOODS[like as Like].name}
				</Pill>
			))}
		</div>
	);
}
