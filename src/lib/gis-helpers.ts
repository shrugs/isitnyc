import prisma from "./prisma";

export const fetchGeometry = async (id: string) => {
	const result = await prisma.$queryRaw<{ geojson: string }[]>`
    SELECT ST_AsGeoJSON(geometry) as geojson
    FROM "Neighborhood"
    WHERE id = ${id}
  `;

	return result[0]?.geojson ? JSON.parse(result[0].geojson) : null;
};
