/*
  Warnings:

  - You are about to drop the `paynentva` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `paynentva` DROP FOREIGN KEY `PaynentVA_app_id_fkey`;

-- DropTable
DROP TABLE `paynentva`;

-- CreateTable
CREATE TABLE `PaymentVA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `json_payload` JSON NOT NULL,
    `json_response` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PaymentVA` ADD CONSTRAINT `PaymentVA_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
