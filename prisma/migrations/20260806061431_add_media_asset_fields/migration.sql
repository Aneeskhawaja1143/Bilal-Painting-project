-- AlterTable
ALTER TABLE "MediaAsset" ADD COLUMN     "bytes" INTEGER,
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "folder" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN     "format" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
