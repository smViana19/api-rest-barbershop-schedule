import { Router } from 'express';
import userRouter from './user-router';
import authRouter from './auth-router';
import specialtyRouter from './specialty-router';
import professionalRouter from './professional-router';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(specialtyRouter);
router.use(professionalRouter);

export default router;
