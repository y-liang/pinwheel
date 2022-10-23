/*
  Warnings:

  - You are about to drop the column `account_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `deactivated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactivated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted_at` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_account_id_fkey";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "deactivated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reactivated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "account_id",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
