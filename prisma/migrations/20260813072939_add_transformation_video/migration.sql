-- AlterTable
ALTER TABLE "Transformation" ADD COLUMN     "videoId" TEXT;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;
