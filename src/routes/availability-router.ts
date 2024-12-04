import { Router } from 'express';
import AvailabilityController from '../controllers/availability-controller';

const availabilityController = new AvailabilityController();
const availabilityRouter = Router();

availabilityRouter.get('/availabilities', availabilityController.getAllAvailability.bind(availabilityController));
availabilityRouter.post('/availabilities', availabilityController.createAvailability.bind(availabilityController));
availabilityRouter.get('/availabilities/:availabilityId', availabilityController.getAvailabilityById.bind(availabilityController));
availabilityRouter.put('/availabilities/:availabilityId', availabilityController.updateAvailability.bind(availabilityController));
availabilityRouter.delete('/availabilities/:availabilityId', availabilityController.deleteAvailability.bind(availabilityController));

export default availabilityRouter;
