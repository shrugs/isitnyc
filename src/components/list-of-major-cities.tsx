import { Pill } from "./pill";

const CITIES = [
	{ name: "Berlin", slug: "Berlin-dXJuOm1ieHBsYzpBY1E2" },
	{ name: "Amsterdam", slug: "Amsterdam-dXJuOm1ieHBsYzpDRWlv" },
	{ name: "San Francisco", slug: "San Francisco-dXJuOm1ieHBsYzpFVzBJN0E" },
	{ name: "Mexico City", slug: "Mexico City-dXJuOm1ieHBsYzpSSjg" },
	{ name: "Barcelona", slug: "Barcelona-dXJuOm1ieHBsYzpkZWhH" },
	{ name: "London", slug: "London-dXJuOm1ieHBsYzphaWhQ" },
	{ name: "Tokyo", slug: "東京都-dXJuOm1ieHBsYzpUMGgw" },
	{ name: "Lisbon", slug: "Lisbon-dXJuOm1ieHBsYzozK2k2" },
	{ name: "Paris", slug: "Paris-dXJuOm1ieHBsYzpEYVJO" },
	{ name: "Taipei", slug: "臺北市-dXJuOm1ieHBsYzpMcWpu" },
	{ name: "Los Angeles", slug: "Los Angeles-dXJuOm1ieHBsYzpDM2ZvN0E" },
	{ name: "Chicago", slug: "Chicago-dXJuOm1ieHBsYzpBNGxJN0E" },
	{ name: "Madrid", slug: "Madrid-dXJuOm1ieHBsYzpBZzlvUmc" },
	{ name: "Miami", slug: "Miami-dXJuOm1ieHBsYzpESStJN0E" },
	{ name: "New Orleans", slug: "New Orleans-dXJuOm1ieHBsYzpEZFNvN0E" },
];

export function ListOfMajorCities() {
	return (
		<div className="flex flex-row flex-wrap gap-2">
			{CITIES.map(({ name, slug }) => (
				<Pill key={slug} href={`/${slug}`}>
					{name}
				</Pill>
			))}
		</div>
	);
}
