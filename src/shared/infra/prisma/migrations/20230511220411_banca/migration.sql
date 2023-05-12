-- CreateTable
CREATE TABLE "banca" (
    "cod_banca" SERIAL NOT NULL,
    "nome_banca" TEXT NOT NULL,
    "razao_social" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "insc_estadual" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banca_pkey" PRIMARY KEY ("cod_banca")
);

-- CreateIndex
CREATE UNIQUE INDEX "banca_cnpj_key" ON "banca"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "banca_insc_estadual_key" ON "banca"("insc_estadual");

-- CreateIndex
CREATE INDEX "banca_cod_banca_idx" ON "banca"("cod_banca");
