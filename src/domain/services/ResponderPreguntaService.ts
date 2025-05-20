import { RespuestaRepository } from '../repositories/RespuestaRepository';
import { Respuesta } from '../entities/Respuesta';

export class ResponderPreguntaService {
  constructor(private readonly repo: RespuestaRepository) {}

  async execute(simulacroId: string, pregunta: string, respuesta: string, correcta: boolean): Promise<void> {
    const rpta = Respuesta.crear(simulacroId, pregunta, respuesta, correcta);
    await this.repo.save(rpta);
  }
}
