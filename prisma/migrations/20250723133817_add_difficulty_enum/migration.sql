/*
  Warnings:

  - You are about to alter the column `difficulty` on the `exercise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `exercise` MODIFY `difficulty` ENUM('beginner', 'intermediate', 'advanced') NOT NULL;
