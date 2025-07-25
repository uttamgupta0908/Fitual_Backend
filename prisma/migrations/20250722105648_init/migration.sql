/*
  Warnings:

  - You are about to drop the column `age` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `fitnessLevel` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `age`,
    DROP COLUMN `fitnessLevel`,
    DROP COLUMN `goal`,
    DROP COLUMN `height`,
    DROP COLUMN `weight`;
