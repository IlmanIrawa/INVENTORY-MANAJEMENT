/*
  Warnings:

  - You are about to drop the column `status_material` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `status_order` on the `transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "itemStatus" AS ENUM ('off', 'free', 'on_duty');

-- CreateEnum
CREATE TYPE "transactionStatus" AS ENUM ('pending', 'on_process', 'done');

-- AlterTable
ALTER TABLE "item" DROP COLUMN "status_material",
ADD COLUMN     "statusItem" "itemStatus" NOT NULL DEFAULT 'on_duty';

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "status_order",
ADD COLUMN     "transactionStatus" "transactionStatus" NOT NULL DEFAULT 'on_process';

-- DropEnum
DROP TYPE "MaterialStatus";

-- DropEnum
DROP TYPE "OrderStatus";
