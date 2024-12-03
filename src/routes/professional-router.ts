import { Router } from 'express';
import ProfessionalController from '../controllers/professional-controller';

const professionalController = new ProfessionalController();
const professionalRouter = Router();

professionalRouter.get(
  '/professionals',
  professionalController.getAllProfessionals.bind(professionalController)
);
professionalRouter.post(
  '/professionals',
  professionalController.createProfessional.bind(professionalController)
);
professionalRouter.get(
  '/professionals/:professionalId',
  professionalController.getProfessionalById.bind(professionalController)
);
professionalRouter.put(
  '/professionals/:professionalId',
  professionalController.updateProfessional.bind(professionalController)
);
professionalRouter.delete(
  '/professionals/:professionalId',
  professionalController.deleteProfessional.bind(professionalController)
);

export default professionalRouter;
