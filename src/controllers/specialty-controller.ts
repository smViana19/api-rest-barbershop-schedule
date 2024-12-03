import { NextFunction, Request, Response } from 'express';
import SpecialtyService from '../services/specialty-service';

export default class SpecialtyController {
  private specialtyService = new SpecialtyService();

  public async createSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const specialties = await this.specialtyService.createSpecialty({
        name,
        description,
      });
      res.status(specialties.status).json({ ...specialties });
    } catch (error) {
      next(error);
    }
  }

  public async getAllSpecialties(req: Request, res: Response, next: NextFunction) {
    try {
      const specialties = await this.specialtyService.getAllSpecialties();
      res.status(specialties.status).json(specialties.message);
    } catch (error) {
      next(error);
    }
  }

  public async getSpecialtyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { specialtyId } = req.params;
      const specialty = await this.specialtyService.getSpecialtyById(specialtyId);
      res.status(specialty.status).json(specialty.message);
    } catch (error) {
      next(error);
    }
  }

  public async updateSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const { specialtyId } = req.params;
      const specialty = await this.specialtyService.updateSpecialty(
        specialtyId,
        { ...req.body }
      );
      res.status(specialty.status).json(specialty.message);
    } catch (error) {
      next(error);
    }
  }

  public async deleteSpecialty(req: Request, res: Response, next: NextFunction) {
    try {
      const { specialtyId } = req.params;
      const specialty = await this.specialtyService.deleteSpecialty(specialtyId);
      res.status(specialty.status).json(specialty.message);
    } catch (error) {
      next(error);
    }
  }
}
