/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/

-- CreateIndex
CREATE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "Media" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "Product" ALTER COLUMN "updatedAt" DROP NOT NULL;
ALTER TABLE "Store" ALTER COLUMN "updatedAt" DROP NOT NULL;


