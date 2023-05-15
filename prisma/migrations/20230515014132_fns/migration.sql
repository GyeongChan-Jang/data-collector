/*
  Warnings:

  - The primary key for the `FoodImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AREA_NM` on the `FoodImage` table. All the data in the column will be lost.
  - You are about to drop the column `FOOD_IMG_URL` on the `FoodImage` table. All the data in the column will be lost.
  - You are about to drop the column `MENU_ID` on the `FoodImage` table. All the data in the column will be lost.
  - You are about to drop the column `RSTR_ID` on the `FoodImage` table. All the data in the column will be lost.
  - You are about to drop the column `RSTR_NM` on the `FoodImage` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `FoodImage` table. All the data in the column will be lost.
  - Added the required column `areaName` to the `FoodImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodImageId` to the `FoodImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `FoodImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuId` to the `FoodImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rstrId` to the `FoodImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rstrName` to the `FoodImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodImage" DROP CONSTRAINT "FoodImage_pkey",
DROP COLUMN "AREA_NM",
DROP COLUMN "FOOD_IMG_URL",
DROP COLUMN "MENU_ID",
DROP COLUMN "RSTR_ID",
DROP COLUMN "RSTR_NM",
DROP COLUMN "id",
ADD COLUMN     "areaName" TEXT NOT NULL,
ADD COLUMN     "foodImageId" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "menuId" TEXT NOT NULL,
ADD COLUMN     "rstrId" TEXT NOT NULL,
ADD COLUMN     "rstrName" TEXT NOT NULL,
ADD CONSTRAINT "FoodImage_pkey" PRIMARY KEY ("foodImageId");

-- CreateTable
CREATE TABLE "Restaurant" (
    "rstrId" TEXT NOT NULL,
    "rstrName" TEXT NOT NULL,
    "rstrRoadAddr" TEXT NOT NULL,
    "rstrLotNumberAddr" TEXT NOT NULL,
    "rstrLat" TEXT NOT NULL,
    "rstrLng" TEXT NOT NULL,
    "rstrPhone" TEXT NOT NULL,
    "bizName" TEXT NOT NULL,
    "bizLicencename" TEXT NOT NULL,
    "rstrDescription" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("rstrId")
);

-- CreateTable
CREATE TABLE "Menu" (
    "menuId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "menuPrice" INTEGER NOT NULL,
    "isSpecial" TEXT NOT NULL,
    "specialName" TEXT,
    "specialUrl" TEXT,
    "areaName" TEXT NOT NULL,
    "rstrId" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "MenuDetail" (
    "menuDetailId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "menuDescription" TEXT,
    "menuCategoryL" TEXT NOT NULL,
    "menuCategoryS" TEXT,
    "menuId" TEXT NOT NULL,
    "rstrName" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,
    "rstrId" TEXT NOT NULL,

    CONSTRAINT "MenuDetail_pkey" PRIMARY KEY ("menuDetailId")
);

-- CreateTable
CREATE TABLE "RestaurantImage" (
    "rstrImageId" TEXT NOT NULL,
    "rstrName" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rstrId" TEXT NOT NULL,

    CONSTRAINT "RestaurantImage_pkey" PRIMARY KEY ("rstrImageId")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDetail" ADD CONSTRAINT "MenuDetail_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuDetail" ADD CONSTRAINT "MenuDetail_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantImage" ADD CONSTRAINT "RestaurantImage_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodImage" ADD CONSTRAINT "FoodImage_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodImage" ADD CONSTRAINT "FoodImage_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;
