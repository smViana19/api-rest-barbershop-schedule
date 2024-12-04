import { Router } from 'express';
import userRouter from './user-router';
import authRouter from './auth-router';
import specialtyRouter from './specialty-router';
import professionalRouter from './professional-router';
import serviceRouter from './service-router';
import availabilityRouter from './availability-router';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(specialtyRouter);
router.use(professionalRouter);
router.use(serviceRouter);
router.use(availabilityRouter);

export default router;
