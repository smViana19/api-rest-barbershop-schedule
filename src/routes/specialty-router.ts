import { Router } from 'express';
import SpecialtyController from '../controllers/specialty-controller';

const specialtyController = new SpecialtyController();
const specialtyRouter = Router();

specialtyRouter.get('/specialties', specialtyController.getAllSpecialties.bind(specialtyController));
specialtyRouter.post('/specialties', specialtyController.createSpecialty.bind(specialtyController));
specialtyRouter.get('/specialties/:specialtyId', specialtyController.getSpecialtyById.bind(specialtyController));
specialtyRouter.put('/specialties/:specialtyId', specialtyController.updateSpecialty.bind(specialtyController));
specialtyRouter.delete('/specialties/:specialtyId', specialtyController.deleteSpecialty.bind(specialtyController));

export default specialtyRouter;
