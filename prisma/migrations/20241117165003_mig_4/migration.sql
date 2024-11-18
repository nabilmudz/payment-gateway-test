/*
  Warnings:

  - You are about to drop the column `appId` on the `accesstoken` table. All the data in the column will be lost.
  - You are about to drop the column `appId` on the `inquiryva` table. All the data in the column will be lost.
  - You are about to drop the column `appId` on the `paynentva` table. All the data in the column will be lost.
  - Added the required column `app_id` to the `AccessToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `app_id` to the `InquiryVA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `app_id` to the `PaynentVA` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accesstoken` DROP FOREIGN KEY `AccessToken_appId_fkey`;

-- DropForeignKey
ALTER TABLE `inquiryva` DROP FOREIGN KEY `InquiryVA_appId_fkey`;

-- DropForeignKey
ALTER TABLE `paynentva` DROP FOREIGN KEY `PaynentVA_appId_fkey`;

-- AlterTable
ALTER TABLE `accesstoken` DROP COLUMN `appId`,
    ADD COLUMN `app_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inquiryva` DROP COLUMN `appId`,
    ADD COLUMN `app_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `paynentva` DROP COLUMN `appId`,
    ADD COLUMN `app_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InquiryVA` ADD CONSTRAINT `InquiryVA_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaynentVA` ADD CONSTRAINT `PaynentVA_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
