import { NextFunction, Request, Response } from "express";
import AvailabilityService from "../services/availability-service";
import { parseAndValidateBRDate } from "../utils/validators/validate-date";
import { validateTime } from "../utils/validators/validate-time";

export default class AvailabilityController {
  private availabilityService = new AvailabilityService();

  public async createAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { professionalId, date, time, isAvailable } = req.body;
      validateTime(time)
      const response = await this.availabilityService.createAvailability({
        professionalId,
        date,
        time,
        isAvailable
      });
      res.status(response.status).json({ ...response });
    } catch (error) {
      next(error);
    }
  }
  public async getAllAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.availabilityService.getAllAvailabilities()
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
  public async getAvailabilityById(req: Request, res: Response, next: NextFunction) {
    try {
      const { availabilityId } = req.params;
      const response = await this.availabilityService.getAvailabilityById(availabilityId);
      res.status(response.status).json(response.message);
    } catch (error) {
      next(error);
    }
  }

  public async getAvailabilityByProfessionalId(req: Request, res: Response, next: NextFunction) {
    try {
      const { professionalId } = req.params;
      const response = await this.availabilityService.getAvailabilityByProfesionalId(professionalId);
      res.status(response.status).json(response.message);
    } catch (error) {
      next(error)
    }
  }

  public async updateAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { availabilityId } = req.params;
      const response = await this.availabilityService.updateAvailability(availabilityId, { ...req.body });
      res.status(response.status).json(response.message);
    } catch (error) {
      next(error);
    }
  }
  public async deleteAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { availabilityId } = req.params;
      const response = await this.availabilityService.deleteAvailability(availabilityId);
      res.status(response.status);
    } catch (error) {
      next(error);
    }
  }
}