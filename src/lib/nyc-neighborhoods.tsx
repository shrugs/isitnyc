import { Like } from "@prisma/client";

export function isNYCNeighborhood(id: string) {
	return Object.values(NYC_NEIGHBORHOODS).find((n) => n.id === id);
}

export const NYC_NEIGHBORHOODS = {
	[Like.Williamsburg]: {
		like: Like.Williamsburg,
		name: "Williamsburg",
		id: "dXJuOm1ieHBsYzpLdnZNN0E",
	},
	[Like.EastWilliamsburg]: {
		like: Like.EastWilliamsburg,
		name: "East Williamsburg",
		id: "dXJuOm1ieHBsYzpDeXZNN0E",
	},
	[Like.CrownHeights]: {
		like: Like.CrownHeights,
		name: "Crown Heights",
		id: "dXJuOm1ieHBsYzpDT3hzN0E",
	},
	[Like.GreenwichVillage]: {
		like: Like.GreenwichVillage,
		name: "Greenwich Village",
		id: "dXJuOm1ieHBsYzpENWFNN0E",
	},
	[Like.SoHo]: {
		like: Like.SoHo,
		name: "SoHo",
		id: "dXJuOm1ieHBsYzpJMUpzN0E",
	},
	[Like.EastVillage]: {
		like: Like.EastVillage,
		name: "East Village",
		id: "dXJuOm1ieHBsYzpDeWFNN0E",
	},
	[Like.Harlem]: {
		like: Like.Harlem,
		name: "Harlem",
		id: "dXJuOm1ieHBsYzpFRDNNN0E",
	},
	[Like.UpperEastSide]: {
		like: Like.UpperEastSide,
		name: "Upper East Side",
		id: "dXJuOm1ieHBsYzpKKy9zN0E",
	},
	[Like.UpperWestSide]: {
		like: Like.UpperWestSide,
		name: "Upper West Side",
		id: "dXJuOm1ieHBsYzpKL2tzN0E",
	},
	[Like.Chelsea]: {
		like: Like.Chelsea,
		name: "Chelsea",
		id: "dXJuOm1ieHBsYzpCb1hzN0E",
	},
	[Like.LowerEastSide]: {
		like: Like.LowerEastSide,
		name: "Lower East Side",
		id: "dXJuOm1ieHBsYzpGbEhzN0E",
	},
	[Like.Tribeca]: {
		like: Like.Tribeca,
		name: "Tribeca",
		id: "dXJuOm1ieHBsYzpKMU9NN0E",
	},
	[Like.BrooklynHeights]: {
		like: Like.BrooklynHeights,
		name: "Brooklyn Heights",
		id: "dXJuOm1ieHBsYzpCRWdNN0E",
	},
	[Like.ParkSlope]: {
		like: Like.ParkSlope,
		name: "Park Slope",
		id: "dXJuOm1ieHBsYzpIT1dNN0E",
	},
	[Like.Astoria]: {
		like: Like.Astoria,
		name: "Astoria",
		id: "dXJuOm1ieHBsYzpBVGRNN0E",
	},
	[Like.DUMBO]: {
		like: Like.DUMBO,
		name: "DUMBO",
		id: "dXJuOm1ieHBsYzpDbkVNN0E",
	},
	[Like.Bushwick]: {
		like: Like.Bushwick,
		name: "Bushwick",
		id: "dXJuOm1ieHBsYzpCTkJNN0E",
	},
	[Like.HellsKitchen]: {
		like: Like.HellsKitchen,
		name: "Hell's Kitchen",
		id: "dXJuOm1ieHBsYzpFTEdNN0E",
	},
	[Like.Chinatown]: {
		like: Like.Chinatown,
		name: "Chinatown",
		id: "dXJuOm1ieHBsYzpCc3hNN0E",
	},
	[Like.LittleItaly]: {
		like: Like.LittleItaly,
		name: "Little Italy",
		id: "dXJuOm1ieHBsYzpGYytzN0E",
	},
	[Like.FinancialDistrict]: {
		like: Like.FinancialDistrict,
		name: "Financial District",
		id: "dXJuOm1ieHBsYzpETVpzN0E",
	},
	[Like.WestVillage]: {
		like: Like.WestVillage,
		name: "West Village",
		id: "dXJuOm1ieHBsYzpLbXdNN0E",
	},
	[Like.AlphabetCity]: {
		like: Like.AlphabetCity,
		name: "Alphabet City",
		id: "dXJuOm1ieHBsYzpjTXpz",
	},
	[Like.MeatpackingDistrict]: {
		like: Like.MeatpackingDistrict,
		name: "Meatpacking District",
		id: "dXJuOm1ieHBsYzpKb21zN0E",
	},
	[Like.Nolita]: {
		like: Like.Nolita,
		name: "Nolita",
		id: "dXJuOm1ieHBsYzpHaUdzN0E",
	},
	[Like.Gramercy]: {
		like: Like.Gramercy,
		name: "Gramercy",
		id: "dXJuOm1ieHBsYzpEd1lNN0E",
	},
	[Like.FlatironDistrict]: {
		like: Like.FlatironDistrict,
		name: "Flatiron District",
		id: "dXJuOm1ieHBsYzpKbU1NN0E",
	},
	[Like.MurrayHill]: {
		like: Like.MurrayHill,
		name: "Murray Hill",
		id: "dXJuOm1ieHBsYzpHWUhNN0E",
	},
	[Like.LongIslandCity]: {
		like: Like.LongIslandCity,
		name: "Long Island City",
		id: "dXJuOm1ieHBsYzpGaHBNN0E",
	},
	[Like.BedStuy]: {
		like: Like.BedStuy,
		name: "Bedford-Stuyvesant",
		id: "dXJuOm1ieHBsYzpBaS9NN0E",
	},
	[Like.RedHook]: {
		like: Like.RedHook,
		name: "Red Hook",
		id: "dXJuOm1ieHBsYzpINGRzN0E",
	},
	[Like.Greenpoint]: {
		like: Like.Greenpoint,
		name: "Greenpoint",
		id: "dXJuOm1ieHBsYzpEMzRNN0E",
	},
	[Like.ProspectHeights]: {
		like: Like.ProspectHeights,
		name: "Prospect Heights",
		id: "dXJuOm1ieHBsYzpIdU1NN0E",
	},
	[Like.FortGreene]: {
		like: Like.FortGreene,
		name: "Fort Greene",
		id: "dXJuOm1ieHBsYzpEWEZzN0E",
	},
	[Like.SunsetPark]: {
		like: Like.SunsetPark,
		name: "Sunset Park",
		id: "dXJuOm1ieHBsYzpKYUpNN0E",
	},
	[Like.Flushing]: {
		like: Like.Flushing,
		name: "Flushing",
		id: "dXJuOm1ieHBsYzpEUjVNN0E",
	},
	[Like.JacksonHeights]: {
		like: Like.JacksonHeights,
		name: "Jackson Heights",
		id: "dXJuOm1ieHBsYzpFdmNzN0E",
	},
	[Like.Sunnyside]: {
		like: Like.Sunnyside,
		name: "Sunnyside",
		id: "dXJuOm1ieHBsYzpKWDFNN0E",
	},
	[Like.ForestHills]: {
		like: Like.ForestHills,
		name: "Forest Hills",
		id: "dXJuOm1ieHBsYzpEVThNN0E",
	},
	[Like.WashingtonHeights]: {
		like: Like.WashingtonHeights,
		name: "Washington Heights",
		id: "dXJuOm1ieHBsYzpLU2xNN0E",
	},
	[Like.Inwood]: {
		like: Like.Inwood,
		name: "Inwood",
		id: "dXJuOm1ieHBsYzpFc3hzN0E",
	},
	[Like.MorningsideHeights]: {
		like: Like.MorningsideHeights,
		name: "Morningside Heights",
		id: "dXJuOm1ieHBsYzpHUGJNN0E",
	},
	[Like.EastHarlem]: {
		like: Like.EastHarlem,
		name: "East Harlem",
		id: "dXJuOm1ieHBsYzpDdFpNN0E",
	},
	[Like.RooseveltIsland]: {
		like: Like.RooseveltIsland,
		name: "Roosevelt Island",
		id: "dXJuOm1ieHBsYzpJT0VNN0E",
	},
	[Like.StatenIsland]: {
		like: Like.StatenIsland,
		name: "Staten Island",
		id: "dXJuOm1ieHBsYzpINzJLN0E",
	},
	[Like.Riverdale]: {
		like: Like.Riverdale,
		name: "Riverdale",
		id: "dXJuOm1ieHBsYzpJQjJNN0E",
	},
	[Like.ConeyIsland]: {
		like: Like.ConeyIsland,
		name: "Coney Island",
		id: "dXJuOm1ieHBsYzpCOTJNN0E",
	},
	[Like.BrightonBeach]: {
		like: Like.BrightonBeach,
		name: "Brighton Beach",
		id: "dXJuOm1ieHBsYzpCQWVNN0E",
	},
	[Like.KipsBay]: {
		like: Like.KipsBay,
		name: "Kips Bay",
		id: "dXJuOm1ieHBsYzpGQUVzN0E",
	},
	[Like.TwoBridges]: {
		like: Like.TwoBridges,
		name: "Two Bridges",
		id: "dXJuOm1ieHBsYzpKNXhNN0E",
	},
	[Like.Koreatown]: {
		like: Like.Koreatown,
		name: "Koreatown",
		id: "dXJuOm1ieHBsYzpGQ2VNN0E",
	},
	[Like.UnionSquare]: {
		like: Like.UnionSquare,
		name: "Union Square",
		id: "dXJuOm1ieHBsYzpKOEhzN0E",
	},
	[Like.NoHo]: {
		like: Like.NoHo,
		name: "NoHo",
		id: "dXJuOm1ieHBsYzpHaUFzN0E",
	},
	[Like.NoMad]: {
		like: Like.NoMad,
		name: "NoMad",
		id: "dXJuOm1ieHBsYzpHaUhzN0E",
	},
	[Like.Gowanus]: {
		like: Like.Gowanus,
		name: "Gowanus",
		id: "dXJuOm1ieHBsYzpEdndNN0E",
	},
	[Like.CobbleHill]: {
		like: Like.CobbleHill,
		name: "Cobble Hill",
		id: "dXJuOm1ieHBsYzpCMStNN0E",
	},
	[Like.CarrollGardens]: {
		like: Like.CarrollGardens,
		name: "Carroll Gardens",
		id: "dXJuOm1ieHBsYzpCWTFNN0E",
	},
	[Like.Kensington]: {
		like: Like.Kensington,
		name: "Kensington",
		id: "dXJuOm1ieHBsYzpFNnFNN0E",
	},
	[Like.BayRidge]: {
		like: Like.BayRidge,
		name: "Bay Ridge",
		id: "dXJuOm1ieHBsYzpBZlBNN0E",
	},
	[Like.DitmasPark]: {
		like: Like.DitmasPark,
		name: "Ditmas Park",
		id: "dXJuOm1ieHBsYzpDY1BzN0E",
	},
	[Like.HudsonYards]: {
		like: Like.HudsonYards,
		name: "Hudson Yards",
		id: "dXJuOm1ieHBsYzpFajhzN0E",
	},
	[Like.RockawayBeach]: {
		like: Like.RockawayBeach,
		name: "Rockaway Beach",
		id: "dXJuOm1ieHBsYzpJSXBzN0E",
	},
	[Like.Flatbush]: {
		like: Like.Flatbush,
		name: "Flatbush",
		id: "dXJuOm1ieHBsYzpEUDlzN0E",
	},
	[Like.MadisonSquare]: {
		like: Like.MadisonSquare,
		name: "Madison Square",
		id: "dXJuOm1ieHBsYzpGbytNN0E",
	},
	[Like.MyrtleWyckoff]: {
		like: Like.MyrtleWyckoff,
		name: "Myrtle-Wyckoff",
		id: "dXJuOm1ieHBsYzpCdm1zN0E",
	},
	[Like.StuyTown]: {
		like: Like.StuyTown,
		name: "Stuyvesant Town",
		id: "dXJuOm1ieHBsYzpKU2xNN0E",
	},
	[Like.BoerumHill]: {
		like: Like.BoerumHill,
		name: "Boerum Hill",
		id: "dXJuOm1ieHBsYzpBMWRNN0E",
	},
	[Like.SouthSlope]: {
		like: Like.SouthSlope,
		name: "South Slope",
		id: "dXJuOm1ieHBsYzpKQUtNN0E",
	},
	[Like.WindsorTerrace]: {
		like: Like.WindsorTerrace,
		name: "Windsor Terrace",
		id: "dXJuOm1ieHBsYzpLMTNNN0E",
	},
	[Like.FortHamilton]: {
		like: Like.FortHamilton,
		name: "Fort Hamilton",
		id: "dXJuOm1ieHBsYzpEWEdzN0E",
	},
	[Like.ManhattanBeach]: {
		like: Like.ManhattanBeach,
		name: "Manhattan Beach",
		id: "dXJuOm1ieHBsYzpGc0RNN0E",
	},
	[Like.ClintonHill]: {
		like: Like.ClintonHill,
		name: "Clinton Hill",
		id: "dXJuOm1ieHBsYzpCejdNN0E",
	},
	[Like.BrooklynNavyYard]: {
		like: Like.BrooklynNavyYard,
		name: "Brooklyn Navy Yard",
		id: "dXJuOm1ieHBsYzpCRWhzN0E",
	},
	[Like.DowntownBrooklyn]: {
		like: Like.DowntownBrooklyn,
		name: "Downtown Brooklyn",
		id: "dXJuOm1ieHBsYzpDaXJNN0E",
	},
	[Like.ProspectLeffertsGardens]: {
		like: Like.ProspectLeffertsGardens,
		name: "Prospect Lefferts Gardens",
		id: "dXJuOm1ieHBsYzpIdVVNN0E",
	},
	[Like.Midtown]: {
		like: Like.Midtown,
		name: "Midtown",
		id: "dXJuOm1ieHBsYzpHQlVNN0E",
	},
};
