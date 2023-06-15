-- DropIndex
DROP INDEX "banca_cod_banca_idx";

-- DropIndex
DROP INDEX "editora_cod_editora_idx";

-- CreateIndex
CREATE INDEX "banca_cod_banca_cod_distribuidora_cod_entregador_idx" ON "banca"("cod_banca", "cod_distribuidora", "cod_entregador");

-- CreateIndex
CREATE INDEX "editora_cod_editora_cod_distribuidora_idx" ON "editora"("cod_editora", "cod_distribuidora");
