import { Like } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function LikePage(props: { params: Promise<{ neighborhood: Like }> }) {
	const { neighborhood } = await props.params;
	if (!Object.values(Like).includes(neighborhood)) notFound();

	// TODO: find tags like Like, pull associated neighborhoods + tags -> <NeighborhoodList />

	return null;
}
