import { getOrRetrievePlace } from "@/lib/get-place";
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

const search = new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN });

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query") as string;

	const sessionToken = new SessionToken();
	const results = await search.suggest(query, {
		sessionToken,
		types: "city",
	});

	const firstSuggestion = results.suggestions?.[0];

	if (!firstSuggestion) notFound();

	const place = await getOrRetrievePlace(firstSuggestion.mapbox_id, sessionToken.toString());

	return NextResponse.json({ id: place.id });
}
