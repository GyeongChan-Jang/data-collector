-- CreateTable
CREATE TABLE "RestaurantQuality" (
    "rstrId" INTEGER NOT NULL,
    "rstrName" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,
    "awardInfo" TEXT,
    "rtiIndex" TEXT,
    "isOnline" TEXT,
    "acceptStatusIndex" TEXT,
    "rating" TEXT,
    "tradAdvisorRating" TEXT,
    "cTripRating" TEXT,
    "naverRating" TEXT,

    CONSTRAINT "RestaurantQuality_pkey" PRIMARY KEY ("rstrId")
);

-- AddForeignKey
ALTER TABLE "RestaurantQuality" ADD CONSTRAINT "RestaurantQuality_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
