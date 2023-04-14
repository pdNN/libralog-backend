import {
  Distribuidora,
  DistribuidoraCreationProps,
} from "../dto/distribuidora";

interface DistribuidoraRepository {
  create(data: DistribuidoraCreationProps): Promise<Distribuidora>;
}

export default DistribuidoraRepository;
