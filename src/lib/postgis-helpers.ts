import prisma from "./prisma";

export async function appendGeometries<T extends { id: string }>(
	places: T[],
): Promise<(T & { geometry: GeoJSON.Geometry })[]> {
	const result = await prisma.$queryRaw<{ id: string; geojson: string }[]>`
		SELECT id, ST_AsGeoJSON(ST_Transform(geometry, 4326)) as geojson
		FROM "Place"
		WHERE id = ANY(${places.map((n) => n.id)})
	`;

	const geometryMap = new Map(result.map((r) => [r.id, JSON.parse(r.geojson) as GeoJSON.Geometry]));

	return places.map((p) => ({
		...p,
		// biome-ignore lint/style/noNonNullAssertion: we know that geometry will exist for all ids
		geometry: geometryMap.get(p.id)!,
	}));
}

export const getGeometry = async (id: string): Promise<GeoJSON.Geometry | null> => {
	const result = await prisma.$queryRaw<{ geojson: string }[]>`
		SELECT ST_AsGeoJSON(ST_Transform(geometry, 4326)) as geojson
		FROM "Place"
		WHERE id = ${id}
	`;

	return result[0]?.geojson ? JSON.parse(result[0].geojson) : null;
};

// export const getBbox = async (id: string): Promise<GeoJSON.Geometry | null> => {
// 	const result = await prisma.$queryRaw<{ geojson: string }[]>`
// 		SELECT ST_AsGeoJSON(ST_Transform(bbox, 4326)) as geojson
// 		FROM "Place"
// 		WHERE id = ${id}
// 	`;

// 	return result[0]?.geojson ? JSON.parse(result[0].geojson) : null;
// };
