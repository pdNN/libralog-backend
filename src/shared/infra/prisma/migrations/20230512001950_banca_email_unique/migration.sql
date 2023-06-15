/*
  Warnings:

  - A unique constraint covering the columns `[des_email]` on the table `banca` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banca_des_email_key" ON "banca"("des_email");
