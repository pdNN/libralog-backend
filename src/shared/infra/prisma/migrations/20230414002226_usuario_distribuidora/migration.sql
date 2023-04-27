-- CreateTable
CREATE TABLE "distribuidora" (
    "cod_distribuidora" SERIAL NOT NULL,
    "nome_distribuidora" TEXT NOT NULL,
    "qtd_licencas" INTEGER NOT NULL DEFAULT 10,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "distribuidora_pkey" PRIMARY KEY ("cod_distribuidora")
);

-- CreateTable
CREATE TABLE "usuario" (
    "cod_usuario" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "des_senha" TEXT NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,
    "cod_distribuidora" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("cod_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "distribuidora_nome_distribuidora_key" ON "distribuidora"("nome_distribuidora");

-- CreateIndex
CREATE INDEX "distribuidora_cod_distribuidora_idx" ON "distribuidora"("cod_distribuidora");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_usuario_key" ON "usuario"("email_usuario");

-- CreateIndex
CREATE INDEX "usuario_cod_usuario_cod_distribuidora_idx" ON "usuario"("cod_usuario", "cod_distribuidora");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cod_distribuidora_fkey" FOREIGN KEY ("cod_distribuidora") REFERENCES "distribuidora"("cod_distribuidora") ON DELETE CASCADE ON UPDATE CASCADE;
