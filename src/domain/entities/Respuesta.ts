export class Respuesta {
    constructor(
      public readonly simulacroId: string,
      public readonly pregunta: string,
      public readonly respuesta: string,
      public readonly correcta: boolean
    ) {}
  
    static crear(simulacroId: string, pregunta: string, respuesta: string, correcta: boolean): Respuesta {
      return new Respuesta(simulacroId, pregunta, respuesta, correcta);
    }
  }
  