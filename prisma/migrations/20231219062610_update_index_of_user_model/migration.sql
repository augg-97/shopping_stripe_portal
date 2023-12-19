/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
ALTER TABLE "User" ADD CONSTRAINT "unique_email_deletedAt_uniq" UNIQUE ("email", "deletedAt");
