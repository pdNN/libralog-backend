import AppError from "@shared/errors/AppError";

import { IBancaDTO, IUpdateBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

interface BancaUpdateRequest extends IUpdateBancaDTO {}

class UpdateBancaService {
  constructor(private bancaRepository: BancaRepository) {}

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
    } = data;

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
    });
    return banca;
  }
}

export default UpdateBancaService;
