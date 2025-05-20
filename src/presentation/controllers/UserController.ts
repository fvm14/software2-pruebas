import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserProfile(req: Request, res: Response): Promise<void> {
  const user = (req as any).user;

  if (!user || !user.userId) {
    res.status(401).json({ message: 'No autorizado.' });
    return;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      email: true,
      experiencia: true,
      monedas: true,
    },
  });

  if (!dbUser) {
    res.status(404).json({ message: 'Usuario no encontrado.' });
    return;
  }

  res.status(200).json({ profile: dbUser });
}
