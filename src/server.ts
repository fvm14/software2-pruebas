import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './presentation/routes/authRoutes';
import userRoutes from './presentation/routes/userRoutes';
import simulacroRoutes from './presentation/routes/simulacroRoutes';
import preguntaRoutes from './presentation/routes/preguntaRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔸 Este es el middleware que necesitas:
app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/preguntas', preguntaRoutes);
app.use('/auth', authRoutes);
app.use('/simulacros', simulacroRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
