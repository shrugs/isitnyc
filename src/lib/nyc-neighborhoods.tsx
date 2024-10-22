import { Like } from "@prisma/client";

export function isNYCNeighborhood(id: string) {
	return Object.values(NYC_NEIGHBORHOODS).find((n) => n.id === id);
}

export const NYC_NEIGHBORHOODS = {
	[Like.Williamsburg]: {
		name: "Williamsburg",
		id: "",
		description: "Hipster, trendy, artsy, foodie scene, live music",
	},
	[Like.EastWilliamsburg]: {
		name: "East Williamsburg",
		id: "",
		description: "Industrial, up-and-coming, artistic, diverse, warehouse parties",
	},
	[Like.CrownHeights]: {
		name: "Crown Heights",
		id: "",
		description: "Cultural diversity, Caribbean influence, historic brownstones, gentrifying",
	},
	[Like.GreenwichVillage]: {
		name: "Greenwich Village",
		id: "",
		description: "Bohemian, historic, LGBTQ+ friendly, NYU campus, Washington Square Park",
	},
	[Like.SoHo]: {
		name: "SoHo",
		id: "",
		description: "Upscale shopping, cast-iron architecture, art galleries, trendy",
	},
	[Like.EastVillage]: {
		name: "East Village",
		id: "",
		description: "Eclectic, punk rock history, dive bars, vintage shops, young crowd",
	},
	[Like.Harlem]: {
		name: "Harlem",
		id: "",
		description: "African American culture, jazz history, soul food, brownstones, revitalizing",
	},
	[Like.UpperEastSide]: {
		name: "Upper East Side",
		id: "",
		description: "Affluent, sophisticated, Museum Mile, upscale shopping, Central Park adjacent",
	},
	[Like.UpperWestSide]: {
		name: "Upper West Side",
		id: "",
		description: "Family-friendly, intellectual, cultural institutions, riverside parks",
	},
	[Like.Chelsea]: {
		name: "Chelsea",
		id: "",
		description: "LGBTQ+ friendly, art galleries, High Line, Chelsea Market, nightlife",
	},
	[Like.LowerEastSide]: {
		name: "Lower East Side",
		id: "",
		description: "Gritty, diverse, nightlife, indie music venues, Jewish heritage",
	},
	[Like.Tribeca]: {
		name: "Tribeca",
		id: "",
		description: "Upscale, loft apartments, celebrity residents, film festival, quiet streets",
	},
	[Like.BrooklynHeights]: {
		name: "Brooklyn Heights",
		id: "",
		description: "Historic, picturesque, promenade views, brownstones, family-friendly",
	},
	[Like.ParkSlope]: {
		name: "Park Slope",
		id: "",
		description:
			"Family-friendly, food co-ops, Prospect Park adjacent, brownstones, stroller central",
	},
	[Like.Astoria]: {
		name: "Astoria",
		id: "",
		description: "Greek community, diverse, affordable, beer gardens, film studios",
	},
	[Like.DUMBO]: {
		name: "DUMBO",
		id: "",
		description: "Scenic waterfront, tech startups, converted warehouses, Instagram-worthy views",
	},
	[Like.Bushwick]: {
		name: "Bushwick",
		id: "",
		description: "Street art, hipster, warehouse parties, diverse, gentrifying",
	},
	[Like.HellsKitchen]: {
		name: "Hell's Kitchen",
		id: "",
		description: "Theater district adjacent, diverse dining, LGBTQ+ nightlife, residential",
	},
	[Like.Chinatown]: {
		name: "Chinatown",
		id: "",
		description: "Authentic Chinese culture, bustling, dim sum, markets, densely populated",
	},
	[Like.LittleItaly]: {
		name: "Little Italy",
		id: "",
		description: "Italian heritage, touristy, pasta restaurants, Feast of San Gennaro",
	},
	[Like.fiDi]: {
		name: "Financial District",
		id: "",
		description: "Wall Street, skyscrapers, historic sites, busy weekdays, quiet nights",
	},
	[Like.WestVillage]: {
		name: "West Village",
		id: "",
		description: "Charming, quaint streets, LGBTQ+ history, celebrity sightings, upscale",
	},
	[Like.AlphabetCity]: {
		name: "Alphabet City",
		id: "",
		description: "Gritty, artistic, community gardens, dive bars, East Village subset",
	},
	[Like.MeatpackingDistrict]: {
		name: "Meatpacking District",
		id: "",
		description: "Trendy nightlife, upscale boutiques, High Line adjacent, cobblestone streets",
	},
	[Like.Nolita]: {
		name: "Nolita",
		id: "",
		description: "Boutique shopping, trendy cafes, Italian influence, intimate atmosphere",
	},
	[Like.Gramercy]: {
		name: "Gramercy",
		id: "",
		description: "Exclusive park, quiet, upscale, historic, literary connections",
	},
	[Like.FlatironDistrict]: {
		name: "Flatiron District",
		id: "",
		description: "Iconic architecture, tech companies, Madison Square Park, shopping",
	},
	[Like.MurrayHill]: {
		name: "Murray Hill",
		id: "",
		description: "Young professionals, bar scene, residential, convenient location",
	},
	[Like.LongIslandCity]: {
		name: "Long Island City",
		id: "",
		description: "Waterfront views, high-rise apartments, arts scene, rapidly developing",
	},
	[Like.BedStuy]: {
		name: "Bedford-Stuyvesant",
		id: "",
		description: "African American culture, brownstones, community-oriented, gentrifying",
	},
	[Like.RedHook]: {
		name: "Red Hook",
		id: "",
		description: "Industrial waterfront, artisanal businesses, isolated, up-and-coming",
	},
	[Like.Greenpoint]: {
		name: "Greenpoint",
		id: "",
		description: "Polish community, hipster influx, waterfront parks, film production",
	},
	[Like.ProspectHeights]: {
		name: "Prospect Heights",
		id: "",
		description: "Diverse, brownstones, Barclays Center, cultural institutions",
	},
	[Like.FortGreene]: {
		name: "Fort Greene",
		id: "",
		description: "Artistic, historic, Fort Greene Park, BAM cultural district",
	},
	[Like.SunsetPark]: {
		name: "Sunset Park",
		id: "",
		description: "Diverse, panoramic views, Brooklyn's Chinatown, Industry City",
	},
	[Like.Flushing]: {
		name: "Flushing",
		id: "",
		description: "Asian cuisine, diverse, bustling, Flushing Meadows Corona Park",
	},
	[Like.JacksonHeights]: {
		name: "Jackson Heights",
		id: "",
		description: "Diverse, LGBTQ+ friendly, international cuisine, garden apartments",
	},
	[Like.Sunnyside]: {
		name: "Sunnyside",
		id: "",
		description: "Residential, diverse, affordable, community-oriented, quiet",
	},
	[Like.ForestHills]: {
		name: "Forest Hills",
		id: "",
		description: "Upscale, suburban feel, tennis stadium, diverse dining",
	},
	[Like.WashingtonHeights]: {
		name: "Washington Heights",
		id: "",
		description: "Dominican culture, The Cloisters, hilly, affordable",
	},
	[Like.Inwood]: {
		name: "Inwood",
		id: "",
		description: "Parks, affordable, diverse, quieter, Manhattan's northernmost neighborhood",
	},
	[Like.MorningsideHeights]: {
		name: "Morningside Heights",
		id: "",
		description: "Academic, Columbia University, Riverside Church, residential",
	},
	[Like.EastHarlem]: {
		name: "East Harlem",
		id: "",
		description: "Latino culture, affordable, colorful murals, historic, gentrifying",
	},
	[Like.RooseveltIsland]: {
		name: "Roosevelt Island",
		id: "",
		description: "Quiet, residential, tram access, East River views, planned community",
	},
	[Like.StatenIsland]: {
		name: "Staten Island",
		id: "",
		description: "Suburban, ferry commuters, parks, diverse communities, less crowded",
	},
	[Like.Riverdale]: {
		name: "Riverdale",
		id: "",
		description: "Affluent, suburban feel, green spaces, Hudson River views",
	},
	[Like.ConeyIsland]: {
		name: "Coney Island",
		id: "",
		description: "Amusement park, boardwalk, beach, Nathan's Hot Dogs, quirky",
	},
	[Like.BrightonBeach]: {
		name: "Brighton Beach",
		id: "",
		description: "Russian community, beach, boardwalk, authentic cuisine",
	},
	[Like.KipsBay]: {
		name: "Kips Bay",
		id: "",
		description: "Residential, hospitals, diverse dining, quiet, convenient",
	},
	[Like.TwoBridges]: {
		name: "Two Bridges",
		id: "",
		description: "Historic, diverse, waterfront, changing rapidly, affordable",
	},
	[Like.Koreatown]: {
		name: "Koreatown",
		id: "",
		description: "Korean cuisine, karaoke, 24/7 energy, compact",
	},
	[Like.UnionSquare]: {
		name: "Union Square",
		id: "",
		description: "Shopping, farmers market, transit hub, rallies and events",
	},
	[Like.NoHo]: {
		name: "NoHo",
		id: "",
		description: "Trendy, historic architecture, boutiques, lofts, artistic",
	},
	[Like.NoMad]: {
		name: "NoMad",
		id: "",
		description: "Hotels, restaurants, design district, centrally located",
	},
	[Like.Gowanus]: {
		name: "Gowanus",
		id: "",
		description: "Industrial, artistic, canal, up-and-coming, quirky businesses",
	},
	[Like.CobbleHill]: {
		name: "Cobble Hill",
		id: "",
		description: "Quaint, family-friendly, brownstones, boutiques, quiet",
	},
	[Like.CarrollGardens]: {
		name: "Carroll Gardens",
		id: "",
		description: "Italian-American heritage, brownstones, tree-lined streets, family-oriented",
	},
	[Like.Kensington]: {
		name: "Kensington",
		id: "",
		description: "Diverse, residential, affordable, family-friendly, quiet",
	},
	[Like.BayRidge]: {
		name: "Bay Ridge",
		id: "",
		description: "Waterfront, family-oriented, diverse, Middle Eastern community",
	},
	[Like.DitmasPark]: {
		name: "Ditmas Park",
		id: "",
		description: "Victorian houses, diverse, quiet, suburban feel, trendy cafes",
	},
	[Like.HudsonYards]: {
		name: "Hudson Yards",
		id: "",
		description: "Modern, high-rise, luxury shopping, The Vessel, new development",
	},
	[Like.RockawayBeach]: {
		name: "Rockaway Beach",
		id: "",
		description: "Surfing, beach community, boardwalk, summer destination",
	},
	[Like.Flatbush]: {
		name: "Flatbush",
		id: "",
		description: "Caribbean culture, diverse, affordable, historic, changing",
	},
	[Like.MadisonSquare]: {
		name: "Madison Square",
		id: "",
		description: "Central location, historic, Madison Square Garden, office buildings",
	},
	[Like.MyrtleWyckoff]: {
		name: "Myrtle-Wyckoff",
		id: "",
		description: "Diverse, affordable, residential, transit hub",
	},
	[Like.StuyTown]: {
		name: "Stuyvesant Town",
		id: "",
		description: "Planned community, residential, family-friendly, green spaces",
	},
	[Like.BoerumHill]: {
		name: "Boerum Hill",
		id: "",
		description: "Brownstones, boutiques, diverse dining, quiet streets",
	},
	[Like.SouthSlope]: {
		name: "South Slope",
		id: "",
		description: "Residential, family-friendly, diverse, more affordable than North Slope",
	},
	[Like.WindsorTerrace]: {
		name: "Windsor Terrace",
		id: "",
		description: "Quiet, residential, family-oriented, Prospect Park adjacent",
	},
	[Like.FortHamilton]: {
		name: "Fort Hamilton",
		id: "",
		description: "Military base, residential, waterfront views, quiet",
	},
	[Like.ManhattanBeach]: {
		name: "Manhattan Beach",
		id: "",
		description: "Affluent, beachfront, quiet, residential, family-oriented",
	},
	[Like.ClintonHill]: {
		name: "Clinton Hill",
		id: "",
		description: "Historic, diverse, Pratt Institute, brownstones, trendy",
	},
	[Like.BrooklynNavyYard]: {
		name: "Brooklyn Navy Yard",
		id: "",
		description: "Industrial, innovative businesses, historic, developing",
	},
	[Like.DowntownBrooklyn]: {
		name: "Downtown Brooklyn",
		id: "",
		description: "Commercial center, high-rise apartments, shopping, cultural institutions",
	},
	[Like.ProspectLeffertsGardens]: {
		name: "Prospect Lefferts Gardens",
		id: "",
		description: "Diverse, residential, Prospect Park adjacent, Caribbean influence",
	},
};
