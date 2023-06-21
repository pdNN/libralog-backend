import AppError from "@shared/errors/AppError";

import { IFiscalDTO, ICreateFiscalDTO } from "../dtos/IFiscalDTO";
import FiscalRepository from "../repositories/IFiscalRepository";
import IDistribuidoraRepository from "@modules/distribuidoras/repositories/IDistribuidoraRepository";
import IEntregadorRepository from "@modules/entregadores/repositories/IEntregadorRepository";
import IEditoraRepository from "@modules/editoras/repositories/IEditoraRepository";
import IBancaRepository from "@modules/bancas/repositories/IBancaRepository";
import IMovimentoRepository from "@modules/movimento/repositories/IMovimentoRepository";
import IRevistasRepository from "@modules/revistas/repositories/IRevistasRepository";

interface FiscalCreationRequest extends ICreateFiscalDTO {}

class CreateFiscalService {
  constructor(
    private fiscalRepository: FiscalRepository,
    private editoraRepository: IEditoraRepository,
    private revistaRepository: IRevistasRepository,
    private movimentoRepository: IMovimentoRepository,
    private entregadorRepository: IEntregadorRepository,
    private bancaRepository: IBancaRepository,
    private distribuidoraRepository: IDistribuidoraRepository,
  ) {}

  async execute(data: FiscalCreationRequest): Promise<IFiscalDTO> {
    const {
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    } = data;

    const distribuidora =
      await this.distribuidoraRepository.getOneByCodDistribuidora(
        cod_distribuidora,
      );

    if (!distribuidora) {
      throw new AppError(
        `Distribuidora com o código ${cod_distribuidora} não existe`,
      );
    }

    const entregador = await this.entregadorRepository.getOneByCodEntregador(
      cod_entregador,
    );

    if (!entregador) {
      throw new AppError(
        `Entregador com o código ${cod_entregador} não existe`,
      );
    }

    const editora = await this.editoraRepository.getOneByCodEditora(
      cod_editora,
    );

    if (!editora) {
      throw new AppError(`editora com o código ${cod_editora} não existe`);
    }

    const banca = await this.bancaRepository.getOneByCodBanca(cod_banca);

    if (!banca) {
      throw new AppError(`banca com o código ${cod_banca} não existe`);
    }

    const movimento = await this.movimentoRepository.getOneByCodMovimento(
      cod_movimento,
    );

    if (!movimento) {
      throw new AppError(`movimento com o código ${cod_movimento} não existe`);
    }

    const revista = await this.revistaRepository.getOneByCodRevista(
      cod_revista,
    );

    if (!revista) {
      throw new AppError(`revista com o código ${cod_revista} não existe`);
    }

    const fiscal = await this.fiscalRepository.create({
      cod_n_nfe,
      n_quantidade,
      vlr_unitario,
      vlr_total,
      dthr_documento,
      cod_editora,
      cod_revista,
      cod_movimento,
      cod_entregador,
      cod_banca,
      cod_distribuidora,
    });

    return fiscal;
  }
}

export default CreateFiscalService;
