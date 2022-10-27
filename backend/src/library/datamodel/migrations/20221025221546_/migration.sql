/*
  Warnings:

  - You are about to drop the column `deactivated` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "deactivated",
ADD COLUMN     "isDeactivated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "deleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
