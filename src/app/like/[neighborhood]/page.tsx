import { Like } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function LikePage({ params }: { params: { neighborhood: string } }) {
	const like = params.neighborhood as Like;
	if (!Object.values(Like).includes(like)) notFound();

	// TODO: find tags like Like, pull associated neighborhoods + tags -> <NeighborhoodList />

	return null;
}
