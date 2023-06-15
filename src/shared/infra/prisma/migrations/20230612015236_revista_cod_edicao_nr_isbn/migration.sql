/*
  Warnings:

  - You are about to drop the column `cod_edicao_revista` on the `revista` table. All the data in the column will be lost.
  - Added the required column `nr_isbn` to the `revista` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "revista" DROP COLUMN "cod_edicao_revista",
ADD COLUMN     "nr_isbn" TEXT NOT NULL;
