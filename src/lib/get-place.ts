import "server-only";

import { SearchBoxCore, type SearchBoxSuggestion, SessionToken } from "@mapbox/search-js-core";
import { type Place, PlaceType, type Tag } from "@prisma/client";
import prisma from "./prisma";

const search = new SearchBoxCore({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN });

async function fetchAndStorePlace(id: string, sessionToken: string) {
	const result = await search.retrieve({ mapbox_id: id } as SearchBoxSuggestion, {
		sessionToken: new SessionToken(sessionToken),
	});

	const feature = result.features.find((feature) => feature.properties.mapbox_id === id);
	if (!feature) {
		console.log(result);
		throw new Error(`Could not find mapbox_id ${id}`);
	}

	if (!["place", "neighborhood", "locality"].includes(feature.properties.feature_type)) {
		console.log(feature);
		throw new Error("Retrieved results is not a relevant feature_type.");
	}

	const isCity = feature.properties.feature_type === "place";

	// if this is a neighborhood and mapbox knows its city, go fetch that as well before continuing
	if (!isCity && feature.properties.context.place) {
		const city = await prisma.place.findUnique({
			where: { id: feature.properties.context.place.id },
		});

		if (!city) {
			await fetchAndStorePlace(feature.properties.context.place.id, sessionToken);
		}
	}

	const bbox = feature.properties.bbox;
	console.log(`Inserting ${id}: ${feature.properties.name}`);
	const [place] = await prisma.$transaction([
		// create the place
		prisma.place.create({
			data: {
				id,
				name: feature.properties.name,
				placeType: isCity ? PlaceType.City : PlaceType.Neighborhood,
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
	]);

	// adds an extra query but makes the types nicer
	if (bbox) {
		await prisma.$executeRaw`
			UPDATE "Place"
			SET bbox = ST_SetSRID(ST_MakeBox2D(
					ST_Point(${bbox[0]}, ${bbox[1]}),
					ST_Point(${bbox[2]}, ${bbox[3]})
				), 4326)
			WHERE id = ${id}
		`;
	}

	return place;
}

export async function getOrRetrievePlace(
	id: string,
	sessionToken?: string,
): Promise<
	Pick<Place, "id" | "name" | "description" | "placeFormatted" | "placeType"> & { tags: Tag[] }
> {
	let place = await prisma.place.findUnique({
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

	if (place) return place;

	// if no neighborhood known, attempt an inline fetch
	if (!sessionToken) {
		throw new Error("Cannot fetch neighborhood without sessionToken");
	}

	place = await fetchAndStorePlace(id, sessionToken);

	return place;
}
