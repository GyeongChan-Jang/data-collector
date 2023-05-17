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

    CONSTRAINT "MenuDetail_pkey" PRIMARY KEY ("menuDetailId")
);
