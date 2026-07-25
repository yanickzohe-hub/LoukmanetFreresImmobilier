-- AlterTable
ALTER TABLE "Terrain" ADD COLUMN "zone" TEXT;

-- CreateTable
CREATE TABLE "Document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'attestation_villageoise',
    "label" TEXT,
    "terrainId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_terrainId_fkey" FOREIGN KEY ("terrainId") REFERENCES "Terrain" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
