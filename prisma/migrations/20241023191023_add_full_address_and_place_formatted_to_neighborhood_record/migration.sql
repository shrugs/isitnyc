/*
  Warnings:

  - Added the required column `fullAddress` to the `Neighborhood` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeFormatted` to the `Neighborhood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Neighborhood" ADD COLUMN     "fullAddress" TEXT NOT NULL,
ADD COLUMN     "placeFormatted" TEXT NOT NULL;
