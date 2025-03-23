/*
  Warnings:

  - You are about to drop the column `fromUser` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "fromUser",
ALTER COLUMN "FromuserID" DROP NOT NULL,
ALTER COLUMN "Message" DROP NOT NULL;
