import AppError from "@shared/errors/AppError";

import { IBancaDTO, IUpdateBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";
import IEntregadorRepository from "@modules/entregadores/repositories/IEntregadorRepository";

interface BancaUpdateRequest extends IUpdateBancaDTO {}

class UpdateBancaService {
  constructor(
    private bancaRepository: BancaRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
    private entregadorRepository: IEntregadorRepository,
  ) {}

  async execute(data: BancaUpdateRequest): Promise<IBancaDTO> {
    const {
      cod_banca,
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
      cod_entregador,
    } = data;

    if (cod_distribuidora) {
      const distribuidora =
        await this.distribuidoraRepository.getOneByCodDistribuidora(
          cod_distribuidora,
        );

      if (!distribuidora) {
        throw new AppError(
          `Distribuidora com o código ${cod_distribuidora} não existe`,
        );
      }
    }

    if (cod_entregador) {
      const entregador = await this.entregadorRepository.getOneByCodEntregador(
        cod_entregador,
      );

      if (!entregador) {
        throw new AppError(
          `Entregador com o código ${cod_entregador} não existe`,
        );
      }
    }

    if (cod_cnpj || cod_insc_estadual) {
      const bancaAlreadyExists =
        await this.bancaRepository.findByCnpjOrInscEstadualOrEmail(
          cod_cnpj,
          cod_insc_estadual,
          des_email,
        );

      if (
        bancaAlreadyExists &&
        bancaAlreadyExists.cod_banca !== data.cod_banca
      ) {
        throw new AppError(
          "CNPJ ou Inscrição Estadual ou E-mail já utilizado por outra banca",
          406,
        );
      }
    }

    const banca = await this.bancaRepository.updateByCodBanca({
      cod_banca,
      nome_banca,
      des_razao_social,
      des_contato,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cnpj,
      cod_insc_estadual,
      des_email,
      cod_distribuidora,
      cod_entregador,
    });
    return banca;
  }
}

export default UpdateBancaService;
