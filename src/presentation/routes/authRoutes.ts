import { Router } from 'express';
import { register, login, logout} from '../controllers/AuthController';
import { changePassword } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/change-password', authMiddleware, changePassword);

export default router;
