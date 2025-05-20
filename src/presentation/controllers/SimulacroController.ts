import { Request, Response } from 'express';
import { CrearSimulacroService } from '../../domain/services/CrearSimulacroService';
import { SimulacroPrismaRepository } from '../../infrastructure/repositories/SimulacroPrismaRepository';
import { ResponderPreguntaService } from '../../domain/services/ResponderPreguntaService';
import { FinalizarSimulacroService } from '../../domain/services/FinalizarSimulacroService';
import { RespuestaPrismaRepository } from '../../infrastructure/repositories/RespuestaPrismaRepository';
import { PreguntaPrismaRepository } from '../../infrastructure/repositories/PreguntaPrismaRepository';

const simulacroRepo = new SimulacroPrismaRepository();
const preguntaRepo = new PreguntaPrismaRepository(); 
const crearSimulacroService = new CrearSimulacroService(simulacroRepo, preguntaRepo);
const respuestaRepo = new RespuestaPrismaRepository();
const responderPreguntaService = new ResponderPreguntaService(respuestaRepo);
const finalizarSimulacroService = new FinalizarSimulacroService(respuestaRepo);

export async function crearSimulacro(req: Request, res: Response): Promise<void> {
  const { area } = req.body;
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: 'No autorizado.' });
    return;
  }

  const { simulacro, preguntas } = await crearSimulacroService.execute(user.userId, area);

  res.status(201).json({
    message: 'Simulacro creado',
    simulacro: {
      id: simulacro.id,
      area: simulacro.area,
      startTime: simulacro.startTime,
      endTime: simulacro.endTime,
      preguntas, // ✅ Devuelve las preguntas aleatorias
    }
  });
}
export async function responderPregunta(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { pregunta, respuesta, correcta } = req.body;
  
    await responderPreguntaService.execute(id, pregunta, respuesta, correcta);
    res.status(201).json({ message: 'Respuesta registrada.' });
  }
  
  export async function finalizarSimulacro(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const totalCorrectas = await finalizarSimulacroService.execute(id);
  
    res.status(200).json({
      message: 'Simulacro finalizado.',
      correctas: totalCorrectas,
      experienciaGanada: totalCorrectas,
      monedasGanadas: totalCorrectas,
    })
}