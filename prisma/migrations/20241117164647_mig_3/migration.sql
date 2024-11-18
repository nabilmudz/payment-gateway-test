/*
  Warnings:

  - You are about to drop the column `app_services` on the `accesstoken` table. All the data in the column will be lost.
  - You are about to drop the column `app_services` on the `inquiryva` table. All the data in the column will be lost.
  - You are about to drop the column `app_services` on the `paynentva` table. All the data in the column will be lost.
  - Added the required column `appId` to the `AccessToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appId` to the `InquiryVA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appId` to the `PaynentVA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accesstoken` DROP COLUMN `app_services`,
    ADD COLUMN `appId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inquiryva` DROP COLUMN `app_services`,
    ADD COLUMN `appId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `paynentva` DROP COLUMN `app_services`,
    ADD COLUMN `appId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AccessToken` ADD CONSTRAINT `AccessToken_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InquiryVA` ADD CONSTRAINT `InquiryVA_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaynentVA` ADD CONSTRAINT `PaynentVA_appId_fkey` FOREIGN KEY (`appId`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
