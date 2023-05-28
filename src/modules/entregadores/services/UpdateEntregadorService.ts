import AppError from "@shared/errors/AppError";

import { IEntregadorDTO, IUpdateEntregadorDTO } from "../dtos/IEntregadorDTO";
import EntregadorRepository from "../repositories/IEntregadorRepository";

interface EntregadorUpdateRequest extends IUpdateEntregadorDTO {}

class UpdateEntregadorService {
  constructor(private entregadorRepository: EntregadorRepository) {}

  async execute(data: EntregadorUpdateRequest): Promise<IEntregadorDTO> {
    const {
      cod_entregador,
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

    if (cod_cpf || cod_cnh) {
      const entregadorAlreadyExists =
        await this.entregadorRepository.findByCpforCnh(cod_cpf, cod_cnh);

      if (
        entregadorAlreadyExists &&
        entregadorAlreadyExists.cod_entregador !== data.cod_entregador
      ) {
        throw new AppError("CPF ou CNH já utilizado por outro entregador", 406);
      }
    }

    const entregador = await this.entregadorRepository.updateByCodEntregador({
      cod_entregador,
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

export default UpdateEntregadorService;
