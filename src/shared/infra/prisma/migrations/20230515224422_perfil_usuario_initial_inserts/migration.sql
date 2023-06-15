/*
  Warnings:

  - You are about to drop the column `des_perfil` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "des_perfil",
ALTER COLUMN "cod_perfil" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "perfil" (
    "cod_perfil" SERIAL NOT NULL,
    "nome_perfil" TEXT NOT NULL,
    "permissoes" TEXT[],
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("cod_perfil")
);

-- CreateIndex
CREATE UNIQUE INDEX "perfil_nome_perfil_key" ON "perfil"("nome_perfil");

-- CreateIndex
CREATE INDEX "perfil_cod_perfil_idx" ON "perfil"("cod_perfil");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cod_perfil_fkey" FOREIGN KEY ("cod_perfil") REFERENCES "perfil"("cod_perfil") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- Initial data
INSERT INTO public.perfil (nome_perfil, permissoes, dthr_criacao, dthr_atualizacao)
VALUES('inicial', '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.perfil (nome_perfil, permissoes, dthr_criacao, dthr_atualizacao)
VALUES('super', '{"super"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.distribuidora (nome_distribuidora, qtd_licencas, dthr_criacao, dthr_atualizacao)
VALUES('LibraLog', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.usuario
(nome_usuario, email_usuario, des_senha, dthr_criacao, dthr_atualizacao, cod_distribuidora, cod_perfil)
VALUES('Super', 'super-libralog@gmail.com', '$2a$08$e6BtkWVRdZ2utGqn9/DLlOh1dXdVyQz3pJKSOYZ1CE2JuWiZX01ey', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 2);
