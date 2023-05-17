/*
  Warnings:

  - You are about to drop the `MenuDetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuCategoryL` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "menuCategoryL" TEXT NOT NULL,
ADD COLUMN     "menuCategoryS" TEXT,
ADD COLUMN     "menuDescription" TEXT;

-- DropTable
DROP TABLE "MenuDetail";
