-- AddForeignKey
ALTER TABLE "RestaurantOperating" ADD CONSTRAINT "RestaurantOperating_rstrId_fkey" FOREIGN KEY ("rstrId") REFERENCES "Restaurant"("rstrId") ON DELETE RESTRICT ON UPDATE CASCADE;
