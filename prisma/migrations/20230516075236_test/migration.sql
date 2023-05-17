/*
  Warnings:

  - Added the required column `rstrId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "rstrId" INTEGER NOT NULL;
