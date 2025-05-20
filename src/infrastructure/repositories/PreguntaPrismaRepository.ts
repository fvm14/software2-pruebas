import { PrismaClient, Prisma } from '@prisma/client';
import { PreguntaRepository } from '../../domain/repositories/PreguntaRepository';
import { Pregunta } from '../../domain/entities/Pregunta';

const prisma = new PrismaClient();

export class PreguntaPrismaRepository implements PreguntaRepository {
  async save(pregunta: Pregunta): Promise<void> {
    await prisma.pregunta.create({
      data: {
        texto: pregunta.texto,
        opciones: pregunta.opciones as Prisma.InputJsonValue,
        respuestaCorrecta: pregunta.respuestaCorrecta,
      },
    });
  }

  async getAll(): Promise<Pregunta[]> {
    const preguntas = await prisma.pregunta.findMany();
    return preguntas.map(p => new Pregunta(p.texto, p.opciones, p.respuestaCorrecta, p.id));
  }

  async getRandom(count: number): Promise<Pregunta[]> {
    const preguntas = await prisma.pregunta.findMany();
    const seleccionadas = preguntas.sort(() => 0.5 - Math.random()).slice(0, count);
    return seleccionadas.map(p => new Pregunta(p.texto, p.opciones, p.respuestaCorrecta, p.id));
  }
}
