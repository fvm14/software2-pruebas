import { Pregunta } from '../entities/Pregunta';

export class PreguntaFactory {
  static crearMultipleChoice(
    texto: string,
    opciones: string[],
    respuestaCorrecta: string
  ): Pregunta {
    if (!opciones.includes(respuestaCorrecta)) {
      throw new Error('La respuesta correcta no está entre las opciones');
    }
    return new Pregunta(texto, opciones, respuestaCorrecta);
  }

  static crearVerdaderoFalso(
    texto: string,
    esVerdadera: boolean
  ): Pregunta {
    const opciones = ['Verdadero', 'Falso'];
    const respuestaCorrecta = esVerdadera ? 'Verdadero' : 'Falso';
    return new Pregunta(texto, opciones, respuestaCorrecta);
  }
}
