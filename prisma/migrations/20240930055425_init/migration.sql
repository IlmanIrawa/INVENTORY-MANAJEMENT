-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('off', 'free', 'on_duty');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'on_process', 'done');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Stok" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status_material" "MaterialStatus" NOT NULL DEFAULT 'on_duty',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_SPK" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "materialID" INTEGER NOT NULL,
    "notifID" INTEGER NOT NULL,
    "status_order" "OrderStatus" NOT NULL DEFAULT 'on_process',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_SPK_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "material_name_key" ON "material"("name");

-- AddForeignKey
ALTER TABLE "order_SPK" ADD CONSTRAINT "order_SPK_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_SPK" ADD CONSTRAINT "order_SPK_materialID_fkey" FOREIGN KEY ("materialID") REFERENCES "material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
