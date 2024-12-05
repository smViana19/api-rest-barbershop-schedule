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
      const availability = await this.availabilityService.createAvailability({
        professionalId,
        date,
        time,
        isAvailable
      });
      res.status(availability.status).json({ ...availability });
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
      const availability = await this.availabilityService.getAvailabilityById(availabilityId);
      res.status(availability.status).json(availability.message);
    } catch (error) {
      next(error);
    }
  }

  public async getAvailabilityByProfessionalId(req: Request, res: Response, next: NextFunction) {
    try {
      const { professionalId } = req.params;
      const availability = await this.availabilityService.getAvailabilityByProfesionalId(professionalId);
      res.status(availability.status).json(availability.message);
    } catch (error) {
      next(error)
    }
  }

  public async updateAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { availabilityId } = req.params;
      const availability = await this.availabilityService.updateAvailability(availabilityId, { ...req.body });
      res.status(availability.status).json(availability.message);
    } catch (error) {
      next(error);
    }
  }
  public async deleteAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { availabilityId } = req.params;
      const availability = await this.availabilityService.deleteAvailability(availabilityId);
      res.status(availability.status).json(availability.message);
    } catch (error) {
      next(error);
    }
  }
}