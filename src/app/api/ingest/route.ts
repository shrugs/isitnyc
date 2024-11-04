import { getOrRetrievePlace } from "@/lib/get-place";
import { getTags } from "@/lib/get-tags";
import { getBbox } from "@/lib/postgis-helpers";
import prisma from "@/lib/prisma";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { PlaceType } from "@prisma/client";
import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

const search = new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN });

export async function GET(request: NextRequest) {
	const neighborhoods = await prisma.place.findMany({
		where: { placeType: PlaceType.Neighborhood, tags: { none: {} } },
		take: 10_000,
	});

	for (const n of neighborhoods) {
		await getTags(n.id);
	}

	console.log("done");

	return NextResponse.json({ len: neighborhoods.length });
}
