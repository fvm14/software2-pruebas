import { PrismaClient } from '@prisma/client';
import { Simulacro } from '../../domain/entities/Simulacro';
import { SimulacroRepository } from '../../domain/repositories/SimulacroRepository';

const prisma = new PrismaClient();

export class SimulacroPrismaRepository implements SimulacroRepository {
  async save(simulacro: Simulacro): Promise<Simulacro> {
    const saved = await prisma.simulacro.create({
      data: {
        userId: simulacro.userId,
        area: simulacro.area,
        startTime: simulacro.startTime,
        endTime: simulacro.endTime,
      }
    });
  
    // Devolvemos el ID del simulacro creado
    return new Simulacro(saved.userId, saved.area, saved.startTime, saved.endTime, saved.id);
  }}