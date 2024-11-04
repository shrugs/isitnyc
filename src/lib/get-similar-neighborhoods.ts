import { appendGeometries } from "@/lib/postgis-helpers";
import prisma from "@/lib/prisma";
import { type Like, PlaceType } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getSimilarNeighborhoods = unstable_cache(
	async (like: Like) => {
		const neighborhoodsWithoutGeography = await prisma.place.findMany({
			where: {
				placeType: PlaceType.Neighborhood,
				tags: { some: { like, weight: { gt: 10 } } },
			},
			select: { id: true, name: true, placeFormatted: true, tags: true },
		});

		return await appendGeometries(neighborhoodsWithoutGeography);
	},
	["similar-neighborhoods"],
	{ revalidate: 60 },
);
