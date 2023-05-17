/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "restaurantId";

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
