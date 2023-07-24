/*
  Warnings:

  - You are about to drop the `Key` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Key";

-- DropTable
DROP TABLE "Setting";

-- CreateTable
CREATE TABLE "keys" (
    "id" INTEGER NOT NULL,
    "client_id" TEXT NOT NULL,
    "client_secret" TEXT NOT NULL,
    "secret_valid_until" TIMESTAMPTZ(3) NOT NULL,
    "owned_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "setting_key" TEXT NOT NULL,
    "setting_value" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "keys_client_id_key" ON "keys"("client_id");
