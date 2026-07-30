/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Made the column `authorId` on table `Notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_authorId_fkey";

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "recipient" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sms" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "recipient" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "Sms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Push" (
    "id" SERIAL NOT NULL,
    "notificationId" INTEGER NOT NULL,
    "recipient" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "Push_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_notificationId_key" ON "Email"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Sms_notificationId_key" ON "Sms"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Push_notificationId_key" ON "Push"("notificationId");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sms" ADD CONSTRAINT "Sms_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Push" ADD CONSTRAINT "Push_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
