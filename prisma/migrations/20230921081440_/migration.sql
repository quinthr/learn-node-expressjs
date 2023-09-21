/*
  Warnings:

  - A unique constraint covering the columns `[id,productId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Update" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Update_id_productId_key" ON "Update"("id", "productId");
