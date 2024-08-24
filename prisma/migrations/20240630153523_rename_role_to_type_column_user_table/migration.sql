/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "type" "USER_TYPE" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "USER_ROLE";
