-- CreateTable
CREATE TABLE `AppServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccessToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_services` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `json_header` JSON NOT NULL,
    `json_payload` JSON NOT NULL,
    `json_response` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InquiryVA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_services` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `json_headers` JSON NOT NULL,
    `json_payload` JSON NOT NULL,
    `json_response` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaynentVA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_services` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `json_payload` JSON NOT NULL,
    `json_response` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
