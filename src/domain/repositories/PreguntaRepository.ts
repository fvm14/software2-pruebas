import { Pregunta } from '../entities/Pregunta';

export interface PreguntaRepository {
  save(pregunta: Pregunta): Promise<void>;
  getAll(): Promise<Pregunta[]>;
  getRandom(count: number): Promise<Pregunta[]>;
}
