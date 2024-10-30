import type { SimpleTag } from "@/lib/get-tags";
import { NYC_NEIGHBORHOODS } from "@/lib/nyc-neighborhoods";
import { LocationTagCell } from "./cell";

export function RenderLocationTags({ tags, link }: { tags: SimpleTag[]; link?: boolean }) {
	return (
		<div className="w-full flex flex-row flex-nowrap overflow-x-hidden gap-px bg-muted border rounded-2xl p-1">
			{tags.length === 0 && (
				<LocationTagCell
					top={<span className="font-mono">¯\_(ツ)_/¯</span>}
					bottom="100%"
					weight={100}
					like={undefined}
				/>
			)}
			{tags.map((tag, i) => (
				<LocationTagCell
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					key={i}
					top={NYC_NEIGHBORHOODS[tag.like].name}
					bottom={`${tag.weight}%`}
					weight={tag.weight}
					like={tag.like}
					link={link}
				/>
			))}
		</div>
	);
}
