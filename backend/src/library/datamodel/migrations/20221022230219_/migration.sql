/*
  Warnings:

  - You are about to drop the column `deactivated_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `reactivated_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `reviewer_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('reader', 'author', 'editor', 'administrator');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('signup', 'login', 'reset', 'deactivate', 'reactivate', 'forget', 'logout', 'verify');

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_author_id_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "deactivated_at",
DROP COLUMN "reactivated_at",
ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'reader';

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "deleted_at",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "author_id",
ADD COLUMN     "reviewer_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "action" "Action" NOT NULL,
    "actor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
