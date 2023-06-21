-- CreateTable
CREATE TABLE "movimento" (
    "cod_movimento" SERIAL NOT NULL,
    "des_movimento" TEXT NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movimento_pkey" PRIMARY KEY ("cod_movimento")
);

-- CreateTable
CREATE TABLE "fiscal" (
    "cod_documento" SERIAL NOT NULL,
    "cod_n_nfe" INTEGER NOT NULL,
    "nr_quantidade" INTEGER NOT NULL,
    "vlr_unitario" DOUBLE PRECISION NOT NULL,
    "vlr_total" DOUBLE PRECISION NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,
    "dthr_documento" TIMESTAMP(3) NOT NULL,
    "cod_editora" INTEGER NOT NULL,
    "cod_revista" INTEGER NOT NULL,
    "cod_movimento" INTEGER NOT NULL,
    "cod_entregador" INTEGER NOT NULL,
    "cod_banca" INTEGER NOT NULL,
    "cod_distribuidora" INTEGER NOT NULL,

    CONSTRAINT "fiscal_pkey" PRIMARY KEY ("cod_documento")
);

-- CreateIndex
CREATE INDEX "movimento_cod_movimento_idx" ON "movimento"("cod_movimento");

-- CreateIndex
CREATE INDEX "fiscal_cod_documento_cod_editora_cod_revista_cod_movimento__idx" ON "fiscal"("cod_documento", "cod_editora", "cod_revista", "cod_movimento", "cod_entregador", "cod_banca", "cod_distribuidora");

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_editora_fkey" FOREIGN KEY ("cod_editora") REFERENCES "editora"("cod_editora") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_revista_fkey" FOREIGN KEY ("cod_revista") REFERENCES "revista"("cod_revista") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_movimento_fkey" FOREIGN KEY ("cod_movimento") REFERENCES "movimento"("cod_movimento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_entregador_fkey" FOREIGN KEY ("cod_entregador") REFERENCES "entregador"("cod_entregador") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_banca_fkey" FOREIGN KEY ("cod_banca") REFERENCES "banca"("cod_banca") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiscal" ADD CONSTRAINT "fiscal_cod_distribuidora_fkey" FOREIGN KEY ("cod_distribuidora") REFERENCES "distribuidora"("cod_distribuidora") ON DELETE CASCADE ON UPDATE CASCADE;
