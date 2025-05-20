import { Router } from 'express';
import { crearPreguntas } from '../controllers/PreguntaController';
import { obtenerPreguntas } from '../controllers/PreguntaController';

const router = Router();

router.post('/', crearPreguntas); // puedes protegerla más adelante
router.get('/', obtenerPreguntas);

export default router;
