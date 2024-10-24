import type { Place } from "@prisma/client";

export const getPlaceSlug = ({ id, name }: Pick<Place, "id" | "name">) =>
	`${encodeURIComponent(name)}-${id}`;

export const getSlugId = (slug: string) => slug.split("-").pop();
