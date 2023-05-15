-- CreateTable
CREATE TABLE "Menu" (
    "menuId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "menuPrice" INTEGER NOT NULL,
    "isSpecial" TEXT NOT NULL,
    "specialName" TEXT,
    "specialUrl" TEXT,
    "areaName" TEXT NOT NULL,
    "rstrId" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("menuId")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
