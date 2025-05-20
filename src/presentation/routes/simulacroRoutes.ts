import { Router } from 'express';
import { crearSimulacro } from '../controllers/SimulacroController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { responderPregunta, finalizarSimulacro } from '../controllers/SimulacroController';

const router = Router();

router.post('/', authMiddleware, crearSimulacro);
router.post('/:id/responder', authMiddleware, responderPregunta);
router.post('/:id/finalizar', authMiddleware, finalizarSimulacro);
export default router;
