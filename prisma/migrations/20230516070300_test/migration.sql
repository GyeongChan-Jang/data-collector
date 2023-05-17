/*
  Warnings:

  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `menuId` on the `Menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
DROP COLUMN "menuId",
ADD COLUMN     "menuId" INTEGER NOT NULL,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("menuId");
