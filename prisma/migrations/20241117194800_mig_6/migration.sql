/*
  Warnings:

  - Added the required column `json_headers` to the `PaymentVA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `paymentva` ADD COLUMN `json_headers` JSON NOT NULL;
