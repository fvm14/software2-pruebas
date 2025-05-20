import { Router } from 'express';
import { getUserProfile } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, getUserProfile);

export default router;
