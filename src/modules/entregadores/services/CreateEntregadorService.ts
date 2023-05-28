import AppError from "@shared/errors/AppError";

import { IEntregadorDTO, ICreateEntregadorDTO } from "../dtos/IEntregadorDTO";
import EntregadorRepository from "../repositories/IEntregadorRepository";

interface EntregadorCreationRequest extends ICreateEntregadorDTO {}

class CreateEntregadorService {
  constructor(private entregadorRepository: EntregadorRepository) {}

  async execute(data: EntregadorCreationRequest): Promise<IEntregadorDTO> {
    const {
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cpf,
      cod_cnh,
      des_email,
    } = data;

    const entregadorAlreadyExists =
      await this.entregadorRepository.findByCpforCnh(cod_cpf, cod_cnh);
    if (entregadorAlreadyExists) {
      throw new AppError("CPF ou CNH já utilizado em outro entregador", 406);
    }

    const entregador = await this.entregadorRepository.create({
      nome_entregador,
      des_endereco,
      nr_endereco,
      des_bairro,
      des_cidade,
      nr_cep,
      nr_telefone,
      cod_cpf,
      cod_cnh,
      des_email,
    });

    return entregador;
  }
}

export default CreateEntregadorService;
