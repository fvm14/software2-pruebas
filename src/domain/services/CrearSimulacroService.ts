import { SimulacroRepository } from '../repositories/SimulacroRepository';
import { Simulacro } from '../entities/Simulacro';
import { PreguntaRepository } from '../repositories/PreguntaRepository';
import { Pregunta } from '../entities/Pregunta';

export class CrearSimulacroService {
  constructor(
    private readonly simulacroRepo: SimulacroRepository,
    private readonly preguntaRepo: PreguntaRepository
  ) {}

  async execute(userId: string, area: string): Promise<{ simulacro: Simulacro, preguntas: Pregunta[] }> {
    const simulacro = Simulacro.crear(userId, area);
    const saved = await this.simulacroRepo.save(simulacro);

    const preguntas = await this.preguntaRepo.getRandom(10); // 👈 obtén 10 aleatorias

    return { simulacro: saved, preguntas };
  }
}
