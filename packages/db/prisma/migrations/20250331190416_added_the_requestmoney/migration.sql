/*
  Warnings:

  - You are about to drop the column `Amount` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `FromuserID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `Message` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestMoneyStatus" AS ENUM ('Requested', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "Amount",
DROP COLUMN "FromuserID",
DROP COLUMN "Message",
ADD COLUMN     "amount" INTEGER,
ADD COLUMN     "fromUserId" INTEGER,
ADD COLUMN     "message" TEXT;

-- CreateTable
CREATE TABLE "RequestMoney" (
    "id" SERIAL NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "status" "RequestMoneyStatus" NOT NULL,

    CONSTRAINT "RequestMoney_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestMoney" ADD CONSTRAINT "RequestMoney_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestMoney" ADD CONSTRAINT "RequestMoney_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
