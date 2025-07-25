/*
  Warnings:

  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fitnessLevel` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `fitnessLevel` VARCHAR(191) NOT NULL,
    ADD COLUMN `goal` VARCHAR(191) NOT NULL,
    ADD COLUMN `height` DOUBLE NOT NULL,
    ADD COLUMN `weight` DOUBLE NOT NULL;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `muscleGroup` VARCHAR(191) NOT NULL,
    `equipment` VARCHAR(191) NOT NULL,
    `difficulty` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
