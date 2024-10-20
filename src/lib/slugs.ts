import type { Neighborhood } from "@prisma/client";

export const getNeighborhoodSlug = ({ id, name }: Pick<Neighborhood, "id" | "name">) =>
	`${encodeURIComponent(name)}-${id}`;

export const getSlugId = (slug: string) => slug.split("-").pop();
