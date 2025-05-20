import { Respuesta } from '../entities/Respuesta';

export interface RespuestaRepository {
  save(respuesta: Respuesta): Promise<void>;
  contarCorrectasPorSimulacro(simulacroId: string): Promise<number>;
}
