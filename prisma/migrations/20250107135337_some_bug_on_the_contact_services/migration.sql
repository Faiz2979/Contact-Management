/*
  Warnings:

  - You are about to drop the column `contactId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `postal` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `contacts` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `phone` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `username` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `username` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `token` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - Added the required column `contact_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_contactId_fkey`;

-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `contacts_username_fkey`;

-- DropIndex
DROP INDEX `addresses_contactId_fkey` ON `addresses`;

-- DropIndex
DROP INDEX `contacts_username_fkey` ON `contacts`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `contactId`,
    DROP COLUMN `postal`,
    DROP COLUMN `state`,
    ADD COLUMN `contact_id` INTEGER NOT NULL,
    ADD COLUMN `postal_code` VARCHAR(10) NOT NULL,
    ADD COLUMN `province` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `contacts` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(100) NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `phone` VARCHAR(20) NULL,
    MODIFY `username` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `username` VARCHAR(100) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `token` VARCHAR(100) NULL,
    ADD PRIMARY KEY (`username`);

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
