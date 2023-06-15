/*
  Warnings:

  - Added the required column `cod_distribuidora` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_entregador` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_distribuidora` to the `editora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banca" ADD COLUMN     "cod_distribuidora" INTEGER NOT NULL,
ADD COLUMN     "cod_entregador" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "editora" ADD COLUMN     "cod_distribuidora" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "banca" ADD CONSTRAINT "banca_cod_distribuidora_fkey" FOREIGN KEY ("cod_distribuidora") REFERENCES "distribuidora"("cod_distribuidora") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banca" ADD CONSTRAINT "banca_cod_entregador_fkey" FOREIGN KEY ("cod_entregador") REFERENCES "entregador"("cod_entregador") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editora" ADD CONSTRAINT "editora_cod_distribuidora_fkey" FOREIGN KEY ("cod_distribuidora") REFERENCES "distribuidora"("cod_distribuidora") ON DELETE CASCADE ON UPDATE CASCADE;
