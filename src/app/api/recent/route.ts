import { getRecentNeighborhoods } from "@/lib/get-recent-neighborhoods";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const cursor = searchParams.get("cursor");
	const limit = 10;

	return NextResponse.json(await getRecentNeighborhoods({ cursor, limit }));
}
