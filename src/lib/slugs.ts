import type { Neighborhood } from "@prisma/client";
import slugify from "slugify";

export const getNeighborhoodSlug = ({
	id,
	name,
}: Pick<Neighborhood, "id" | "name">) =>
	`${slugify(name, {
		lower: true,
		trim: true,
	})}-${id}`;

export const getSlugId = (slug: string) => slug.split("-").pop();
