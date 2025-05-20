import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el registro.' });
  }
}

/**
 * Inicio de sesión
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado.' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: 'Contraseña incorrecta.' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }


}
export async function logout(req: Request, res: Response): Promise<void> {
  // No hay sesión que destruir en backend con JWT, pero se puede responder al cliente
  res.json({ message: 'Sesión cerrada correctamente (token eliminado del lado del cliente).' });
}
export async function changePassword(req: Request, res: Response): Promise<void> {
  const user = (req as any).user;
  const { currentPassword, newPassword } = req.body;

  if (!user || !user.userId) {
    res.status(401).json({ message: 'No autorizado.' });
    return;
  }

  const prisma = new PrismaClient();
  const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });

  if (!dbUser) {
    res.status(404).json({ message: 'Usuario no encontrado.' });
    return;
  }

  const isValid = await bcrypt.compare(currentPassword, dbUser.password);
  if (!isValid) {
    res.status(403).json({ message: 'Contraseña actual incorrecta.' });
    return;
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.userId },
    data: { password: hashedNewPassword },
  });

  res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
}
