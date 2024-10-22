-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Like" ADD VALUE 'EastWilliamsburg';
ALTER TYPE "Like" ADD VALUE 'GreenwichVillage';
ALTER TYPE "Like" ADD VALUE 'SoHo';
ALTER TYPE "Like" ADD VALUE 'EastVillage';
ALTER TYPE "Like" ADD VALUE 'Harlem';
ALTER TYPE "Like" ADD VALUE 'UpperEastSide';
ALTER TYPE "Like" ADD VALUE 'UpperWestSide';
ALTER TYPE "Like" ADD VALUE 'Chelsea';
ALTER TYPE "Like" ADD VALUE 'LowerEastSide';
ALTER TYPE "Like" ADD VALUE 'Tribeca';
ALTER TYPE "Like" ADD VALUE 'BrooklynHeights';
ALTER TYPE "Like" ADD VALUE 'ParkSlope';
ALTER TYPE "Like" ADD VALUE 'Astoria';
ALTER TYPE "Like" ADD VALUE 'DUMBO';
ALTER TYPE "Like" ADD VALUE 'Bushwick';
ALTER TYPE "Like" ADD VALUE 'HellsKitchen';
ALTER TYPE "Like" ADD VALUE 'Chinatown';
ALTER TYPE "Like" ADD VALUE 'LittleItaly';
ALTER TYPE "Like" ADD VALUE 'fiDi';
ALTER TYPE "Like" ADD VALUE 'WestVillage';
ALTER TYPE "Like" ADD VALUE 'AlphabetCity';
ALTER TYPE "Like" ADD VALUE 'MeatpackingDistrict';
ALTER TYPE "Like" ADD VALUE 'Nolita';
ALTER TYPE "Like" ADD VALUE 'Gramercy';
ALTER TYPE "Like" ADD VALUE 'FlatironDistrict';
ALTER TYPE "Like" ADD VALUE 'MurrayHill';
ALTER TYPE "Like" ADD VALUE 'LongIslandCity';
ALTER TYPE "Like" ADD VALUE 'BedStuy';
ALTER TYPE "Like" ADD VALUE 'RedHook';
ALTER TYPE "Like" ADD VALUE 'Greenpoint';
ALTER TYPE "Like" ADD VALUE 'ProspectHeights';
ALTER TYPE "Like" ADD VALUE 'FortGreene';
ALTER TYPE "Like" ADD VALUE 'SunsetPark';
ALTER TYPE "Like" ADD VALUE 'Flushing';
ALTER TYPE "Like" ADD VALUE 'JacksonHeights';
ALTER TYPE "Like" ADD VALUE 'Sunnyside';
ALTER TYPE "Like" ADD VALUE 'ForestHills';
ALTER TYPE "Like" ADD VALUE 'WashingtonHeights';
ALTER TYPE "Like" ADD VALUE 'Inwood';
ALTER TYPE "Like" ADD VALUE 'MorningsideHeights';
ALTER TYPE "Like" ADD VALUE 'EastHarlem';
ALTER TYPE "Like" ADD VALUE 'RooseveltIsland';
ALTER TYPE "Like" ADD VALUE 'StatenIsland';
ALTER TYPE "Like" ADD VALUE 'Riverdale';
ALTER TYPE "Like" ADD VALUE 'ConeyIsland';
ALTER TYPE "Like" ADD VALUE 'BrightonBeach';
ALTER TYPE "Like" ADD VALUE 'KipsBay';
ALTER TYPE "Like" ADD VALUE 'TwoBridges';
ALTER TYPE "Like" ADD VALUE 'Koreatown';
ALTER TYPE "Like" ADD VALUE 'UnionSquare';
ALTER TYPE "Like" ADD VALUE 'NoHo';
ALTER TYPE "Like" ADD VALUE 'NoMad';
ALTER TYPE "Like" ADD VALUE 'Gowanus';
ALTER TYPE "Like" ADD VALUE 'CobbleHill';
ALTER TYPE "Like" ADD VALUE 'CarrollGardens';
ALTER TYPE "Like" ADD VALUE 'Kensington';
ALTER TYPE "Like" ADD VALUE 'BayRidge';
ALTER TYPE "Like" ADD VALUE 'DitmasPark';
ALTER TYPE "Like" ADD VALUE 'HudsonYards';
ALTER TYPE "Like" ADD VALUE 'RockawayBeach';
ALTER TYPE "Like" ADD VALUE 'Flatbush';
ALTER TYPE "Like" ADD VALUE 'MadisonSquare';
ALTER TYPE "Like" ADD VALUE 'MyrtleWyckoff';
ALTER TYPE "Like" ADD VALUE 'StuyTown';
ALTER TYPE "Like" ADD VALUE 'BoerumHill';
ALTER TYPE "Like" ADD VALUE 'SouthSlope';
ALTER TYPE "Like" ADD VALUE 'WindsorTerrace';
ALTER TYPE "Like" ADD VALUE 'FortHamilton';
ALTER TYPE "Like" ADD VALUE 'ManhattanBeach';
ALTER TYPE "Like" ADD VALUE 'ClintonHill';
ALTER TYPE "Like" ADD VALUE 'BrooklynNavyYard';
ALTER TYPE "Like" ADD VALUE 'DowntownBrooklyn';
ALTER TYPE "Like" ADD VALUE 'ProspectLeffertsGardens';
