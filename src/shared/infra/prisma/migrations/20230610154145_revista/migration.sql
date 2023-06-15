-- CreateTable
CREATE TABLE "revista" (
    "cod_revista" SERIAL NOT NULL,
    "nome_revista" TEXT NOT NULL,
    "cod_edicao_revista" INTEGER NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,
    "cod_editora" INTEGER NOT NULL,

    CONSTRAINT "revista_pkey" PRIMARY KEY ("cod_revista")
);

-- CreateIndex
CREATE INDEX "revista_cod_revista_idx" ON "revista"("cod_revista");

-- AddForeignKey
ALTER TABLE "revista" ADD CONSTRAINT "revista_cod_editora_fkey" FOREIGN KEY ("cod_editora") REFERENCES "editora"("cod_editora") ON DELETE CASCADE ON UPDATE CASCADE;
