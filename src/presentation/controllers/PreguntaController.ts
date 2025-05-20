import { Request, Response } from 'express';
import { PreguntaPrismaRepository } from '../../infrastructure/repositories/PreguntaPrismaRepository';
import { CrearPreguntaService } from '../../domain/services/CrearPreguntaService';
import { ObtenerPreguntasService } from '../../domain/services/ObtenerPreguntasService';
import { Pregunta } from '../../domain/entities/Pregunta';

const repo = new PreguntaPrismaRepository();
const crearPreguntaService = new CrearPreguntaService(repo);
const obtenerPreguntasService = new ObtenerPreguntasService(repo);

export async function crearPreguntas(req: Request, res: Response): Promise<void> {
    const preguntas = req.body;
  
    if (!Array.isArray(preguntas)) {
      res.status(400).json({ message: 'Debes enviar un arreglo de preguntas.' });
      return;
    }
  
    try {
      for (const p of preguntas) {
        const { texto, opciones, respuestaCorrecta } = p;
  
        if (!texto || !Array.isArray(opciones) || opciones.length < 2 || !respuestaCorrecta) {
          throw new Error(`Pregunta inválida: "${texto}"`);
        }
  
        await crearPreguntaService.execute(texto, opciones, respuestaCorrecta);
      }
  
      res.status(201).json({ message: `${preguntas.length} preguntas registradas correctamente.` });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  export async function obtenerPreguntas(req: Request, res: Response): Promise<void> {
    const { aleatorias, cantidad } = req.query;
  
    try {
      let preguntas: Pregunta[];
  
      if (aleatorias === 'true' && cantidad) {
        preguntas = await obtenerPreguntasService.obtenerAleatorias(Number(cantidad));
      } else {
        preguntas = await obtenerPreguntasService.obtenerTodas();
      }
  
      res.status(200).json({ preguntas });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener preguntas.', error: error.message });
    }
  }
  