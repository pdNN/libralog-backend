import { IEntregadorDTO } from "../dtos/IEntregadorDTO";
import EntregadorRepository from "../repositories/IEntregadorRepository";

class GetAllEntregadorService {
  constructor(private entregadorRepository: EntregadorRepository) {}

  async execute(): Promise<IEntregadorDTO[]> {
    const entregador = await this.entregadorRepository.getAll();

    return entregador;
  }
}

export default GetAllEntregadorService;
