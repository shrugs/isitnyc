import prisma from "@/lib/prisma";
import { getNeighborhoodSlug } from "@/lib/slugs";
import { Like } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return Object.values(Like).map((like) => ({
		neighborhood: like,
	}));
}

export default async function LikePage({
	params,
}: { params: { neighborhood: string } }) {
	const like = params.neighborhood as Like;
	if (!Object.values(Like).includes(like)) notFound();

	const neighborhoods = await prisma.neighborhood.findMany({
		where: {
			tags: {
				some: {
					like: like,
				},
			},
		},
		include: { tags: true },
	});

	return (
		<main className="p-4">
			<h1 className="text-2xl font-bold mb-4">Neighborhoods with {like}</h1>
			<ul className="space-y-4">
				{neighborhoods.map((neighborhood) => (
					<li key={neighborhood.id}>
						<Link
							href={`/${getNeighborhoodSlug(neighborhood)}`}
							className="text-lg font-semibold hover:underline"
						>
							{neighborhood.name}
						</Link>
						{neighborhood.description && (
							<p className="mt-1 text-sm">{neighborhood.description}</p>
						)}
						<ul className="mt-2 list-disc list-inside">
							{neighborhood.tags.map((tag) => (
								<li key={tag.id} className="text-sm">
									{tag.like}: {tag.weight}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</main>
	);
}
