import { PreguntaRepository } from '../repositories/PreguntaRepository';
import { Pregunta } from '../entities/Pregunta';
import { PreguntaFactory } from '../factories/PreguntaFactory';

export class CrearPreguntaService {
  constructor(private readonly repo: PreguntaRepository) {}

  async execute(texto: string, opciones: string[], respuestaCorrecta: string): Promise<void> {
    const pregunta = PreguntaFactory.crearMultipleChoice(texto, opciones, respuestaCorrecta);
    await this.repo.save(pregunta);
  }
}
