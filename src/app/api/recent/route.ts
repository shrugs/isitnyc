import { appendGeometries } from "@/lib/postgis-helpers";
import prisma from "@/lib/prisma";
import type { Neighborhood, Tag } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export type RecentResponse = {
	neighborhoods: (Pick<Neighborhood, "id" | "name" | "placeFormatted"> & {
		tags: Tag[];
		geometry: GeoJSON.Geometry;
	})[];
	nextCursor: string | null;
};

export async function getRecentNeighborhoods({
	cursor = null,
	limit = 10,
}: { cursor?: string | null; limit?: number } = {}): Promise<RecentResponse> {
	const neighborhoods = await prisma.neighborhood.findMany({
		where: {
			description: { not: null },
			tags: { some: {} },
		},
		orderBy: { updatedAt: "desc" },
		take: limit,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
		select: { id: true, name: true, placeFormatted: true, tags: true },
	});

	const nextCursor = neighborhoods.length === limit ? neighborhoods[limit - 1].id : null;

	return {
		neighborhoods: await appendGeometries(neighborhoods),
		nextCursor,
	};
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor = searchParams.get("cursor");
	const limit = 10;

	return NextResponse.json(await getRecentNeighborhoods({ cursor, limit }));
}
