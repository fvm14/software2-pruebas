import { PrismaClient } from '@prisma/client';
import { RespuestaRepository } from '../repositories/RespuestaRepository';

const prisma = new PrismaClient();

export class FinalizarSimulacroService {
  constructor(private readonly respuestaRepo: RespuestaRepository) {}

  async execute(simulacroId: string): Promise<number> {
    const correctas = await this.respuestaRepo.contarCorrectasPorSimulacro(simulacroId);

    // Actualizar usuario con experiencia y monedas (1 por correcta)
    const simulacro = await prisma.simulacro.findUnique({
      where: { id: simulacroId },
      include: { user: true },
    });

    if (!simulacro) throw new Error('Simulacro no encontrado');

    await prisma.user.update({
      where: { id: simulacro.userId },
      data: {
        experiencia: simulacro.user.experiencia + correctas,
        monedas: simulacro.user.monedas + correctas,
      },
    });

    await prisma.simulacro.update({
      where: { id: simulacroId },
      data: { endTime: new Date() },
    });

    return correctas;
  }
}
