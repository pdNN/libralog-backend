import AppError from "@shared/errors/AppError";

import { IBancaDTO, ICreateBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

interface BancaCreationRequest extends ICreateBancaDTO {}

class CreateBancaService {
  constructor(private bancaRepository: BancaRepository) {}

  async execute(data: BancaCreationRequest): Promise<IBancaDTO> {
    const {
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

    const bancaAlreadyExists = await this.bancaRepository.findByNome(
      nome_banca,
    );

    if (bancaAlreadyExists) {
      throw new AppError("Nome já utilizado por outra banca", 406);
    }

    const banca = await this.bancaRepository.create({
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

export default CreateBancaService;
