import { Prisma } from '@prisma/client';

export class Pregunta {
  constructor(
    public readonly texto: string,
    public readonly opciones: Prisma.JsonValue,
    public readonly respuestaCorrecta: string,
    public readonly id?: string
  ) {}
}
