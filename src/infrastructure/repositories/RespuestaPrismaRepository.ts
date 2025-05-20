import { PrismaClient } from '@prisma/client';
import { Respuesta } from '../../domain/entities/Respuesta';
import { RespuestaRepository } from '../../domain/repositories/RespuestaRepository';

const prisma = new PrismaClient();

export class RespuestaPrismaRepository implements RespuestaRepository {
  async save(respuesta: Respuesta): Promise<void> {
    await prisma.respuesta.create({
      data: {
        simulacroId: respuesta.simulacroId,
        pregunta: respuesta.pregunta,
        respuesta: respuesta.respuesta,
        correcta: respuesta.correcta,
      },
    });
  }

  async contarCorrectasPorSimulacro(simulacroId: string): Promise<number> {
    return prisma.respuesta.count({
      where: {
        simulacroId,
        correcta: true,
      },
    });
  }
}
