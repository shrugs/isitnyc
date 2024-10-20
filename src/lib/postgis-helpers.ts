import prisma from "./prisma";

export const fetchGeometry = async (
	id: string,
): Promise<GeoJSON.Geometry | null> => {
	const result = await prisma.$queryRaw<{ geojson: string }[]>`
    SELECT ST_AsGeoJSON(ST_Transform(geometry, 4326)) as geojson
    FROM "Neighborhood"
    WHERE id = ${id}
  `;

	return result[0]?.geojson ? JSON.parse(result[0].geojson) : null;
};

export const toFeature = (
	id: string,
	geometry: GeoJSON.Geometry,
): GeoJSON.Feature => ({
	type: "Feature",
	id,
	geometry,
	properties: {},
});

export const toFeatureCollection = (
	feature: GeoJSON.Feature,
): GeoJSON.FeatureCollection => ({
	type: "FeatureCollection",
	features: [feature],
});
