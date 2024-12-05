import { Router } from 'express';
import AppointmentController from '../controllers/appointment-controller';

const appointmentController = new AppointmentController();
const appointmentRouter = Router();

appointmentRouter.get('/appointments', appointmentController.getAllAppointments.bind(appointmentController));
appointmentRouter.post('/appointments', appointmentController.createAppointment.bind(appointmentController));
appointmentRouter.get('/appointments/user/:userId', appointmentController.getAppointmentsByUserId.bind(appointmentController));
appointmentRouter.get('/appointments/:appointmentId', appointmentController.getAppointmentById.bind(appointmentController));
appointmentRouter.put('/appointments/:appointmentId', appointmentController.updateAppointment.bind(appointmentController));
appointmentRouter.delete('/appointments/:appointmentId', appointmentController.deleteAppointment.bind(appointmentController));

export default appointmentRouter;
