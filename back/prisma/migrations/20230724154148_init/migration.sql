/*
  Warnings:

  - The primary key for the `settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[setting_key]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "settings" DROP CONSTRAINT "settings_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "settings_setting_key_key" ON "settings"("setting_key");
