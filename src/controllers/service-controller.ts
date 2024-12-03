import { NextFunction, Request, Response } from "express";
import ServiceService from "../services/service-service";

export default class ServiceController {
  private serviceService = new ServiceService();

  public async createService(req: Request, res: Response, next: NextFunction) {
    try {
      const { specialtyId, name, price } = req.body;
      const response = await this.serviceService.createService({
        specialtyId,
        name,
        price
      });
      res.status(response.status).json({ ...response });
    } catch (error) {
      next(error)
    }
  }

  public async getAllServices(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.serviceService.getAllServices();
      res.status(status).json(message);
    } catch (error) {
      next(error)
    }
  }

  public async getServiceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const service = await this.serviceService.getServiceById(serviceId)
      res.status(service.status).json(service.message);
    } catch (error) {
      next(error)
    }
  }

  public async updateService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const service = await this.serviceService.updateService(serviceId, { ...req.body })
      res.status(service.status).json(service.message);
    } catch (error) {
      next(error)

    }
  }
  public async deleteService(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId } = req.params;
      const service = await this.serviceService.deleteService(serviceId)
      res.status(service.status).json(service.message);
    } catch (error) {
      next(error)
    }
  }
}