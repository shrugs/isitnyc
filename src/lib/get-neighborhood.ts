import {
	SearchBoxCore,
	type SearchBoxSuggestion,
	SessionToken,
} from "@mapbox/search-js-core";
import type { Neighborhood, Tag } from "@prisma/client";
import { fetchGeometry } from "./postgis-helpers";
import prisma from "./prisma";

export async function getOrRetrieveNeighborhood(
	id: string,
	sessionToken?: string,
): Promise<[(Neighborhood & { tags: Tag[] }) | null, GeoJSON.Geometry | null]> {
	let [neighborhood, geometry] = await Promise.all([
		prisma.neighborhood.findUnique({
			where: { id },
			include: { tags: true },
		}),
		fetchGeometry(id),
	]);

	if (!neighborhood) {
		if (!sessionToken) {
			throw new Error("Cannot fetch neighborhood without sessionToken");
		}

		// if no neighborhood known, attempt an inline fetch
		const search = new SearchBoxCore({
			accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
		});

		const result = await search.retrieve(
			{ mapbox_id: id } as SearchBoxSuggestion,
			{
				sessionToken: new SessionToken(sessionToken),
			},
		);

		if (result.features.length === 0) return [null, null];

		// save this value to the db
		const feature = result.features[0];

		if (
			!["neighborhood", "locality"].includes(feature.properties.feature_type)
		) {
			throw new Error("Retrieved results is not a neighborhood or locality.");
		}

		neighborhood = await prisma.neighborhood.create({
			data: {
				id,
				name: feature.properties.name,
				properties: feature.properties as object,
			},
			include: { tags: true },
		});

		await prisma.$executeRaw`
      UPDATE "Neighborhood"
      SET geometry = ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)}), 4326)
      WHERE id = ${id}
    `;

		geometry = feature.geometry;
	}

	return [neighborhood, geometry];
}
