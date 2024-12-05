import { Router } from 'express';
import userRouter from './user-router';
import authRouter from './auth-router';
import specialtyRouter from './specialty-router';
import professionalRouter from './professional-router';
import serviceRouter from './service-router';
import availabilityRouter from './availability-router';
import appointmentRouter from './appointment-router';

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(specialtyRouter);
router.use(professionalRouter);
router.use(serviceRouter);
router.use(availabilityRouter);
router.use(appointmentRouter);

export default router;
