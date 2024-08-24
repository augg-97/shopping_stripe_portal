/*
  Warnings:

  - Added the required column `createdUser` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdUser" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdUser_fkey" FOREIGN KEY ("createdUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
