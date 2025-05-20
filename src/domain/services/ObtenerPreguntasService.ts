import { PreguntaRepository } from '../repositories/PreguntaRepository';
import { Pregunta } from '../entities/Pregunta';

export class ObtenerPreguntasService {
  constructor(private readonly repo: PreguntaRepository) {}

  async obtenerTodas(): Promise<Pregunta[]> {
    return this.repo.getAll();
  }

  async obtenerAleatorias(cantidad: number): Promise<Pregunta[]> {
    return this.repo.getRandom(cantidad);
  }
}
