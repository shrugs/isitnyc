import { getOrRetrievePlace } from "./get-place";
import { getTags } from "./get-tags";
import { NYC_NEIGHBORHOODS } from "./nyc-neighborhoods";

export async function retrieveAllNYCNeighborhoods() {
	for (const n of Object.values(NYC_NEIGHBORHOODS)) {
		await getOrRetrievePlace(n.id, "manual");
		await getTags(n.id);
		await fetch(`http://localhost:3000/api/describe/${n.id}`, { method: "POST" });
	}
}
