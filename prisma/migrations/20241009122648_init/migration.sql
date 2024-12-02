/*
  Warnings:

  - You are about to drop the column `statusItem` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `transactionStatus` on the `transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('off', 'free', 'on_duty');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'on_process', 'done');

-- AlterTable
ALTER TABLE "item" DROP COLUMN "statusItem",
ADD COLUMN     "status_material" "MaterialStatus" NOT NULL DEFAULT 'on_duty';

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "transactionStatus",
ADD COLUMN     "status_order" "OrderStatus" NOT NULL DEFAULT 'on_process';

-- DropEnum
DROP TYPE "itemStatus";

-- DropEnum
DROP TYPE "transactionStatus";
