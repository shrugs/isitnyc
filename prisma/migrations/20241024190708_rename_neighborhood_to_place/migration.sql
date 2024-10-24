/*
  Warnings:

  - You are about to drop the column `neighborhoodId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `Neighborhood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `placeId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('City', 'Neighborhood');

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_neighborhoodId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "neighborhoodId",
ADD COLUMN     "placeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Neighborhood";

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeType" "PlaceType" NOT NULL,
    "fullAddress" TEXT NOT NULL,
    "placeFormatted" TEXT NOT NULL,
    "description" TEXT,
    "geometry" geometry(Point, 4326),
    "properties" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_geometry_idx" ON "Place" USING GIST ("geometry");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
