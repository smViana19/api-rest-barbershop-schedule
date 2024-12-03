import { Router } from 'express';
import ServiceController from '../controllers/service-controller';

const serviceController = new ServiceController();
const serviceRouter = Router();

serviceRouter.get('/services', serviceController.getAllServices.bind(serviceController));
serviceRouter.post('/services', serviceController.createService.bind(serviceController));
serviceRouter.get('/services/:serviceId', serviceController.getServiceById.bind(serviceController));
serviceRouter.put('/services/:serviceId', serviceController.updateService.bind(serviceController));
serviceRouter.delete('/services/:serviceId', serviceController.deleteService.bind(serviceController));

export default serviceRouter;
