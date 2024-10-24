import "server-only";

import { SearchBoxCore, type SearchBoxSuggestion, SessionToken } from "@mapbox/search-js-core";
import { type Place, PlaceType, type PrismaPromise, type Tag } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "./prisma";
import { getPlaceSlug } from "./slugs";

export async function getOrRetrievePlace(
	id: string,
	sessionToken?: string,
): Promise<
	Pick<Place, "id" | "name" | "description" | "placeFormatted" | "placeType"> & { tags: Tag[] }
> {
	const place = await prisma.place.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			description: true,
			placeFormatted: true,
			placeType: true,
			tags: true,
		},
	});

	if (place) {
		// leftover session token? shouldn't happen to real users
		if (sessionToken) return redirect(`/${getPlaceSlug(place)}`);

		return place;
	}

	// if no neighborhood known, attempt an inline fetch
	if (!sessionToken) {
		throw new Error("Cannot fetch neighborhood without sessionToken");
	}

	const search = new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN });
	const result = await search.retrieve({ mapbox_id: id } as SearchBoxSuggestion, {
		sessionToken: new SessionToken(sessionToken),
	});

	const feature = result.features?.[0];
	if (!feature) throw new Error(`Could not find mapbox_id ${id}`);

	const name = feature.properties.name;

	if (!["place", "neighborhood", "locality"].includes(feature.properties.feature_type)) {
		console.log(feature);
		throw new Error("Retrieved results is not a relevant feature_type.");
	}

	const bbox = feature.properties.bbox;
	await prisma.$transaction(
		[
			// create the place
			prisma.place.create({
				data: {
					id,
					name,
					placeType:
						feature.properties.feature_type === "place" ? PlaceType.City : PlaceType.Neighborhood,
					fullAddress: feature.properties.full_address,
					placeFormatted: feature.properties.place_formatted,
					properties: feature.properties as object,
				},
				include: { tags: true },
			}),
			// add its location to geometry
			prisma.$executeRaw`
				UPDATE "Place"
				SET geometry = ST_SetSRID(ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)}), 4326)
				WHERE id = ${id}
			`,
			// if bbox, add to bbox
			bbox &&
				prisma.$executeRaw`
					UPDATE "Place"
					SET bbox = ST_SetSRID(ST_MakeBox2D(
							ST_Point(${bbox[0]}, ${bbox[1]}),
							ST_Point(${bbox[2]}, ${bbox[3]})
						), 4326)
					WHERE id = ${id}
				`,
			// biome-ignore lint/suspicious/noExplicitAny: don't care
		].filter<PrismaPromise<any>>((p) => !!p),
	);

	redirect(`/${getPlaceSlug({ id, name })}`);
}
