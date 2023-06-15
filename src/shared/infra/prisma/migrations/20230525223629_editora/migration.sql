-- CreateTable
CREATE TABLE "editora" (
    "cod_editora" SERIAL NOT NULL,
    "nome_editora" TEXT NOT NULL,
    "des_razao_social" TEXT NOT NULL,
    "des_contato" TEXT NOT NULL,
    "des_endereco" TEXT NOT NULL,
    "nr_endereco" TEXT NOT NULL,
    "des_bairro" TEXT NOT NULL,
    "des_cidade" TEXT NOT NULL,
    "nr_cep" TEXT NOT NULL,
    "nr_telefone" TEXT NOT NULL,
    "cod_cnpj" TEXT NOT NULL,
    "cod_insc_estadual" TEXT NOT NULL,
    "des_email" TEXT NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editora_pkey" PRIMARY KEY ("cod_editora")
);

-- CreateIndex
CREATE UNIQUE INDEX "editora_cod_cnpj_key" ON "editora"("cod_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "editora_cod_insc_estadual_key" ON "editora"("cod_insc_estadual");

-- CreateIndex
CREATE UNIQUE INDEX "editora_des_email_key" ON "editora"("des_email");

-- CreateIndex
CREATE INDEX "editora_cod_editora_idx" ON "editora"("cod_editora");
