import { Like } from "@prisma/client";

export const LIKES_SANS_UNKNOWN = Object.keys(Like).filter((l) => l !== Like.Unknown);
