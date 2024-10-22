import "server-only";

import { SearchBoxCore, type SearchBoxSuggestion, SessionToken } from "@mapbox/search-js-core";
import type { Neighborhood, Tag } from "@prisma/client";
import { redirect } from "next/navigation";
import { fetchGeometry } from "./postgis-helpers";
import prisma from "./prisma";
import { getNeighborhoodSlug } from "./slugs";

export async function getOrRetrieveNeighborhood(
	id: string,
	sessionToken?: string,
): Promise<[Neighborhood & { tags: Tag[] }, GeoJSON.Geometry]> {
	const [neighborhood, geometry] = await Promise.all([
		prisma.neighborhood.findUnique({
			where: { id },
			include: { tags: true },
		}),
		fetchGeometry(id),
	]);

	if (neighborhood && geometry) {
		// leftover session token? shouldn't happen to real users
		if (sessionToken) return redirect(`/${getNeighborhoodSlug(neighborhood)}`);

		return [neighborhood, geometry];
	}

	// if no neighborhood known, attempt an inline fetch
	if (!sessionToken) {
		throw new Error("Cannot fetch neighborhood without sessionToken");
	}

	const search = new SearchBoxCore({
		accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
	});

	const result = await search.retrieve({ mapbox_id: id } as SearchBoxSuggestion, {
		sessionToken: new SessionToken(sessionToken),
	});

	const feature = result.features?.[0];
	if (!feature) throw new Error(`Could not find mapbox_id ${id}`);

	const name = feature.properties.name;

	if (!["neighborhood", "locality"].includes(feature.properties.feature_type)) {
		throw new Error("Retrieved results is not a neighborhood or locality.");
	}

	await prisma.$transaction([
		prisma.neighborhood.create({
			data: {
				id,
				name,
				properties: feature.properties as object,
			},
			include: { tags: true },
		}),
		prisma.$executeRaw`
      UPDATE "Neighborhood"
      SET geometry = ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)}), 4326)
      WHERE id = ${id}
    `,
	]);

	redirect(`/${getNeighborhoodSlug({ id, name })}`);
}
