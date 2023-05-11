/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `banca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[insc_estadual]` on the table `banca` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banca_cnpj_key" ON "banca"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "banca_insc_estadual_key" ON "banca"("insc_estadual");

-- CreateIndex
CREATE INDEX "banca_cod_banca_idx" ON "banca"("cod_banca");
