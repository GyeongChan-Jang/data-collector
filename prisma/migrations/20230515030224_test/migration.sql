/*
  Warnings:

  - You are about to drop the column `bizLicencename` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the `FoodImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RestaurantImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bizLicenceName` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FoodImage" DROP CONSTRAINT "FoodImage_menuId_fkey";

-- DropForeignKey
ALTER TABLE "FoodImage" DROP CONSTRAINT "FoodImage_rstrId_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_rstrId_fkey";

-- DropForeignKey
ALTER TABLE "MenuDetail" DROP CONSTRAINT "MenuDetail_menuId_fkey";

-- DropForeignKey
ALTER TABLE "MenuDetail" DROP CONSTRAINT "MenuDetail_rstrId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantImage" DROP CONSTRAINT "RestaurantImage_rstrId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "bizLicencename",
ADD COLUMN     "bizLicenceName" TEXT NOT NULL;

-- DropTable
DROP TABLE "FoodImage";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "MenuDetail";

-- DropTable
DROP TABLE "RestaurantImage";
