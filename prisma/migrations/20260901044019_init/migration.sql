-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PageHero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL DEFAULT '',
    "imageUrls" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "introEyebrow" TEXT NOT NULL DEFAULT '',
    "introTitle" TEXT NOT NULL DEFAULT '',
    "introBody" TEXT NOT NULL DEFAULT '',
    "introImageUrl" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT NOT NULL DEFAULT '[]',
    "ctaTitle" TEXT NOT NULL DEFAULT '',
    "ctaBody" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "missionBlocks" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "GreetingContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "directorName" TEXT NOT NULL DEFAULT '',
    "directorTitle" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "principleBlocks" TEXT NOT NULL DEFAULT '[]',
    "processSteps" TEXT NOT NULL DEFAULT '[]',
    "compareLeftTitle" TEXT NOT NULL DEFAULT '',
    "compareRightTitle" TEXT NOT NULL DEFAULT '',
    "compareLeft" TEXT NOT NULL DEFAULT '[]',
    "compareRight" TEXT NOT NULL DEFAULT '[]',
    "faq" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "principleBlocks" TEXT NOT NULL DEFAULT '[]',
    "processSteps" TEXT NOT NULL DEFAULT '[]',
    "compareLeftTitle" TEXT NOT NULL DEFAULT '',
    "compareRightTitle" TEXT NOT NULL DEFAULT '',
    "compareLeft" TEXT NOT NULL DEFAULT '[]',
    "compareRight" TEXT NOT NULL DEFAULT '[]',
    "faq" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "photoUrl" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "hoursText" TEXT NOT NULL DEFAULT '',
    "mapEmbedUrl" TEXT NOT NULL DEFAULT '',
    "inquiryToEmail" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PageHero_slug_key" ON "PageHero"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_slug_key" ON "Treatment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_slug_key" ON "Clinic"("slug");
