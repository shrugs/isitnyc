import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor = searchParams.get("cursor");
	const limit = 10;

	const neighborhoods = await prisma.neighborhood.findMany({
		where: {
			description: { not: null },
			tags: { some: {} },
		},
		orderBy: { updatedAt: "desc" },
		take: limit,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
		include: { tags: true },
	});

	const nextCursor = neighborhoods.length === limit ? neighborhoods[limit - 1].id : null;

	return NextResponse.json({
		neighborhoods,
		nextCursor,
	});
}
