/*
  Warnings:

  - You are about to drop the column `rstrId` on the `Menu` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_rstrId_fkey";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "rstrId",
ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
