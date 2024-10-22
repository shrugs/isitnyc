/*
  Warnings:

  - The values [fiDi] on the enum `Like` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Like_new" AS ENUM ('Williamsburg', 'EastWilliamsburg', 'CrownHeights', 'GreenwichVillage', 'SoHo', 'EastVillage', 'Harlem', 'UpperEastSide', 'UpperWestSide', 'Chelsea', 'LowerEastSide', 'Tribeca', 'BrooklynHeights', 'ParkSlope', 'Astoria', 'DUMBO', 'Bushwick', 'HellsKitchen', 'Chinatown', 'LittleItaly', 'FinancialDistrict', 'WestVillage', 'AlphabetCity', 'MeatpackingDistrict', 'Nolita', 'Gramercy', 'FlatironDistrict', 'MurrayHill', 'LongIslandCity', 'BedStuy', 'RedHook', 'Greenpoint', 'ProspectHeights', 'FortGreene', 'SunsetPark', 'Flushing', 'JacksonHeights', 'Sunnyside', 'ForestHills', 'WashingtonHeights', 'Inwood', 'MorningsideHeights', 'EastHarlem', 'RooseveltIsland', 'StatenIsland', 'Riverdale', 'ConeyIsland', 'BrightonBeach', 'KipsBay', 'TwoBridges', 'Koreatown', 'UnionSquare', 'NoHo', 'NoMad', 'Gowanus', 'CobbleHill', 'CarrollGardens', 'Kensington', 'BayRidge', 'DitmasPark', 'HudsonYards', 'RockawayBeach', 'Flatbush', 'MadisonSquare', 'MyrtleWyckoff', 'StuyTown', 'BoerumHill', 'SouthSlope', 'WindsorTerrace', 'FortHamilton', 'ManhattanBeach', 'ClintonHill', 'BrooklynNavyYard', 'DowntownBrooklyn', 'ProspectLeffertsGardens', 'Midtown');
ALTER TABLE "Tag" ALTER COLUMN "like" TYPE "Like_new" USING ("like"::text::"Like_new");
ALTER TYPE "Like" RENAME TO "Like_old";
ALTER TYPE "Like_new" RENAME TO "Like";
DROP TYPE "Like_old";
COMMIT;
