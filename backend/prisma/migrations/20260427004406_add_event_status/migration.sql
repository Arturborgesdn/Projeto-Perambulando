-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "genre" TEXT,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "price" TEXT,
    "image" TEXT,
    "description" TEXT,
    "ticketLink" TEXT,
    "instagramLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Evento" ("category", "createdAt", "date", "description", "genre", "id", "image", "instagramLink", "location", "price", "ticketLink", "title") SELECT "category", "createdAt", "date", "description", "genre", "id", "image", "instagramLink", "location", "price", "ticketLink", "title" FROM "Evento";
DROP TABLE "Evento";
ALTER TABLE "new_Evento" RENAME TO "Evento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
