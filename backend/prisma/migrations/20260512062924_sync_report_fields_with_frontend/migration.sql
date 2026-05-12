/*
  Warnings:

  - You are about to drop the column `title` on the `Report` table. All the data in the column will be lost.
  - Added the required column `item` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "title",
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';
