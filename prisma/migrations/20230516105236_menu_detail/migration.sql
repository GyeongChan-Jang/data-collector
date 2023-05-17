/*
  Warnings:

  - The primary key for the `MenuDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `menuDetailId` column on the `MenuDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MenuDetail" DROP CONSTRAINT "MenuDetail_pkey",
DROP COLUMN "menuDetailId",
ADD COLUMN     "menuDetailId" SERIAL NOT NULL,
ADD CONSTRAINT "MenuDetail_pkey" PRIMARY KEY ("menuDetailId");
