-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AboutContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "missionBlocks" TEXT NOT NULL DEFAULT '[]',
    "missionTitle" TEXT NOT NULL DEFAULT '',
    "missionSubtitle" TEXT NOT NULL DEFAULT '',
    "systemTitle" TEXT NOT NULL DEFAULT '',
    "systemSubtitle" TEXT NOT NULL DEFAULT '',
    "systemIntro" TEXT NOT NULL DEFAULT '',
    "systemBlocks" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_AboutContent" ("body", "id", "imageUrl", "missionBlocks", "title") SELECT "body", "id", "imageUrl", "missionBlocks", "title" FROM "AboutContent";
DROP TABLE "AboutContent";
ALTER TABLE "new_AboutContent" RENAME TO "AboutContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
