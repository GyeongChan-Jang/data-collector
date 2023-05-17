/*
  Warnings:

  - Added the required column `rstrName` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "rstrName" TEXT NOT NULL;
