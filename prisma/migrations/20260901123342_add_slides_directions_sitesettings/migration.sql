-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "logoUrl" TEXT NOT NULL DEFAULT ''
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "hoursText" TEXT NOT NULL DEFAULT '',
    "directionsText" TEXT NOT NULL DEFAULT '',
    "mapEmbedUrl" TEXT NOT NULL DEFAULT '',
    "inquiryToEmail" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_ContactInfo" ("address", "email", "hoursText", "id", "inquiryToEmail", "mapEmbedUrl", "phone") SELECT "address", "email", "hoursText", "id", "inquiryToEmail", "mapEmbedUrl", "phone" FROM "ContactInfo";
DROP TABLE "ContactInfo";
ALTER TABLE "new_ContactInfo" RENAME TO "ContactInfo";
CREATE TABLE "new_PageHero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL DEFAULT '',
    "imageUrls" TEXT NOT NULL DEFAULT '[]',
    "slides" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_PageHero" ("id", "imageUrls", "slug", "subtitle", "title") SELECT "id", "imageUrls", "slug", "subtitle", "title" FROM "PageHero";
DROP TABLE "PageHero";
ALTER TABLE "new_PageHero" RENAME TO "PageHero";
CREATE UNIQUE INDEX "PageHero_slug_key" ON "PageHero"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
