import prisma from "./prisma";

export async function appendGeometries<T extends { id: string }>(
	neighborhoods: T[],
): Promise<(T & { geometry: GeoJSON.Geometry })[]> {
	const result = await prisma.$queryRaw<{ id: string; geojson: string }[]>`
		SELECT id, ST_AsGeoJSON(ST_Transform(geometry, 4326)) as geojson
		FROM "Neighborhood"
		WHERE id = ANY(${neighborhoods.map((n) => n.id)})
	`;

	const geometryMap = new Map(result.map((r) => [r.id, JSON.parse(r.geojson) as GeoJSON.Geometry]));

	return neighborhoods.map((n) => ({
		...n,
		// biome-ignore lint/style/noNonNullAssertion: we know that geometry will exist for all ids
		geometry: geometryMap.get(n.id)!,
	}));
}

export const fetchGeometry = async (id: string): Promise<GeoJSON.Geometry | null> => {
	const result = await prisma.$queryRaw<{ geojson: string }[]>`
		SELECT ST_AsGeoJSON(ST_Transform(geometry, 4326)) as geojson
		FROM "Neighborhood"
		WHERE id = ${id}
	`;

	return result[0]?.geojson ? JSON.parse(result[0].geojson) : null;
};

export const toFeature = (id: string, geometry: GeoJSON.Geometry): GeoJSON.Feature => ({
	type: "Feature",
	id,
	geometry,
	properties: {},
});

export const toFeatureCollection = (feature: GeoJSON.Feature): GeoJSON.FeatureCollection => ({
	type: "FeatureCollection",
	features: [feature],
});
