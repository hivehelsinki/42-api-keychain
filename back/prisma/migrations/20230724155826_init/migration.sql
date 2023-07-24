/*
  Warnings:

  - Added the required column `name` to the `keys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "keys" ADD COLUMN     "name" TEXT NOT NULL;
