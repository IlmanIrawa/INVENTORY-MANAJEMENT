/*
  Warnings:

  - You are about to drop the `material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_SPK` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_SPK" DROP CONSTRAINT "order_SPK_materialID_fkey";

-- DropForeignKey
ALTER TABLE "order_SPK" DROP CONSTRAINT "order_SPK_userID_fkey";

-- DropTable
DROP TABLE "material";

-- DropTable
DROP TABLE "order_SPK";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status_material" "MaterialStatus" NOT NULL DEFAULT 'on_duty',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "materialID" INTEGER NOT NULL,
    "notifID" INTEGER NOT NULL,
    "status_order" "OrderStatus" NOT NULL DEFAULT 'on_process',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_name_key" ON "item"("name");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_materialID_fkey" FOREIGN KEY ("materialID") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
