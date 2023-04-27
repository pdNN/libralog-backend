-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "cod_perfil" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "des_perfil" TEXT NOT NULL DEFAULT 'Inicial';
