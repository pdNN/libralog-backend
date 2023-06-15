/*
  Warnings:

  - You are about to drop the column `bairro` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `contato` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `insc_estadual` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `numero` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `razao_social` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `banca` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `banca` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cod_cnpj]` on the table `banca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cod_insc_estadual]` on the table `banca` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cod_cnpj` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_insc_estadual` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_bairro` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_cidade` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_contato` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_email` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_endereco` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `des_razao_social` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nr_cep` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nr_endereco` to the `banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nr_telefone` to the `banca` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "banca_cnpj_key";

-- DropIndex
DROP INDEX "banca_insc_estadual_key";

-- AlterTable
ALTER TABLE "banca" DROP COLUMN "bairro",
DROP COLUMN "cep",
DROP COLUMN "cidade",
DROP COLUMN "cnpj",
DROP COLUMN "contato",
DROP COLUMN "email",
DROP COLUMN "endereco",
DROP COLUMN "insc_estadual",
DROP COLUMN "numero",
DROP COLUMN "razao_social",
DROP COLUMN "telefone",
DROP COLUMN "tipo",
ADD COLUMN     "cod_cnpj" TEXT NOT NULL,
ADD COLUMN     "cod_insc_estadual" TEXT NOT NULL,
ADD COLUMN     "des_bairro" TEXT NOT NULL,
ADD COLUMN     "des_cidade" TEXT NOT NULL,
ADD COLUMN     "des_contato" TEXT NOT NULL,
ADD COLUMN     "des_email" TEXT NOT NULL,
ADD COLUMN     "des_endereco" TEXT NOT NULL,
ADD COLUMN     "des_razao_social" TEXT NOT NULL,
ADD COLUMN     "nr_cep" TEXT NOT NULL,
ADD COLUMN     "nr_endereco" TEXT NOT NULL,
ADD COLUMN     "nr_telefone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "banca_cod_cnpj_key" ON "banca"("cod_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "banca_cod_insc_estadual_key" ON "banca"("cod_insc_estadual");
