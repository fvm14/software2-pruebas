-- CreateTable
CREATE TABLE "Pregunta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "texto" TEXT NOT NULL,
    "opciones" JSONB NOT NULL,
    "respuestaCorrecta" TEXT NOT NULL
);
