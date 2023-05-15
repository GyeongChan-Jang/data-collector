/*
  Warnings:

  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `rstrId` on the `Restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "rstrId",
ADD COLUMN     "rstrId" INTEGER NOT NULL,
ALTER COLUMN "rstrPhone" DROP NOT NULL,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("rstrId");
