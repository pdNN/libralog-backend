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
      razao_social,
      tipo,
      contato,
      endereco,
      numero,
      bairro,
      cidade,
      cep,
      telefone,
      cnpj,
      insc_estadual,
      email,
    } = data;

    if (nome_banca) {
      const bancaAlreadyExists = await this.bancaRepository.findByNome(
        nome_banca,
      );

      if (
        bancaAlreadyExists &&
        bancaAlreadyExists.cod_banca !== data.cod_banca
      ) {
        throw new AppError("Nome já utilizado por outra banca", 406);
      }
    }

    const banca = await this.bancaRepository.updateByCodBanca({
      cod_banca,
      nome_banca,
      razao_social,
      tipo,
      contato,
      endereco,
      numero,
      bairro,
      cidade,
      cep,
      telefone,
      cnpj,
      insc_estadual,
      email,
    });
    return banca;
  }
}

export default UpdateBancaService;
