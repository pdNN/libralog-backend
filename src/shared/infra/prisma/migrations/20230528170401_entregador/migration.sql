-- CreateTable
CREATE TABLE "entregador" (
    "cod_entregador" SERIAL NOT NULL,
    "nome_entregador" TEXT NOT NULL,
    "des_endereco" TEXT NOT NULL,
    "nr_endereco" TEXT NOT NULL,
    "des_bairro" TEXT NOT NULL,
    "des_cidade" TEXT NOT NULL,
    "nr_cep" TEXT NOT NULL,
    "nr_telefone" TEXT NOT NULL,
    "cod_cpf" TEXT NOT NULL,
    "cod_cnh" TEXT NOT NULL,
    "des_email" TEXT NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entregador_pkey" PRIMARY KEY ("cod_entregador")
);

-- CreateIndex
CREATE UNIQUE INDEX "entregador_cod_cpf_key" ON "entregador"("cod_cpf");

-- CreateIndex
CREATE UNIQUE INDEX "entregador_cod_cnh_key" ON "entregador"("cod_cnh");

-- CreateIndex
CREATE INDEX "entregador_cod_entregador_idx" ON "entregador"("cod_entregador");
