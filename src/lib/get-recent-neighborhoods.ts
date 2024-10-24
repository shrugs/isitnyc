import { appendGeometries } from "@/lib/postgis-helpers";
import prisma from "@/lib/prisma";
import { type Place, PlaceType, type Tag } from "@prisma/client";

export async function getRecentNeighborhoods({ limit = 10 }: { limit?: number } = {}): Promise<
	(Pick<Place, "id" | "name" | "placeFormatted"> & {
		tags: Tag[];
		geometry: GeoJSON.Geometry;
	})[]
> {
	const neighborhoods = await prisma.place.findMany({
		where: {
			placeType: PlaceType.Neighborhood,
			description: { not: null },
			tags: { some: {} },
		},
		orderBy: { updatedAt: "desc" },
		take: limit,
		select: { id: true, name: true, placeFormatted: true, tags: true },
	});

	return await appendGeometries(neighborhoods);
}
