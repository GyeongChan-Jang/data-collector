/*
  Warnings:

  - Added the required column `rastaurantId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_rstrId_fkey";

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "rastaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_rastaurantId_fkey" FOREIGN KEY ("rastaurantId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
