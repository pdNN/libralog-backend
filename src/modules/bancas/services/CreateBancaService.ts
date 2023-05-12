import AppError from "@shared/errors/AppError";

import { IBancaDTO, ICreateBancaDTO } from "../dtos/IBancaDTO";
import BancaRepository from "../repositories/IBancaRepository";

interface BancaCreationRequest extends ICreateBancaDTO {}

class CreateBancaService {
  constructor(private bancaRepository: BancaRepository) {}

  async execute(data: BancaCreationRequest): Promise<IBancaDTO> {
    const {
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

    const bancaAlreadyExists =
      await this.bancaRepository.findByCnpjOrInscEstadualOrEmail(
        cod_cnpj,
        cod_insc_estadual,
        des_email,
      );

    if (bancaAlreadyExists) {
      throw new AppError(
        "CNPJ ou Inscrição Estadual ou E-mail já utilizado por outra banca",
        406,
      );
    }

    const banca = await this.bancaRepository.create({
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

export default CreateBancaService;
