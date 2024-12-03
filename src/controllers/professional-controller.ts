import { NextFunction, Request, Response } from 'express';
import ProfessionalService from '../services/professional-service';

export default class ProfessionalController {
  private professionalService = new ProfessionalService();
  public async createProfessional(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, specialtyId } = req.body;
      const response = await this.professionalService.createProfessional({
        userId,
        specialtyId,
      });
      res.status(response.status).json({ ...response });
    } catch (error) {
      next(error);
    }
  }
  public async getAllProfessionals(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, message } =
        await this.professionalService.getAllProfessionals();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
  public async getProfessionalById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { professionalId } = req.params;
      const professional =
        await this.professionalService.getProfessionalById(professionalId);
      res.status(professional.status).json(professional.message);
    } catch (error) {
      next(error);
    }
  }
  public async updateProfessional(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { professionalId } = req.params;
      const professional = await this.professionalService.updateProfessional(
        professionalId,
        { ...req.body }
      );
      res.status(professional.status).json(professional.message);
    } catch (error) {
      next(error);
    }
  }
  public async deleteProfessional(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { professionalId } = req.params;
      const professional =
        await this.professionalService.deleteProfessional(professionalId);
      res.status(professional.status).json(professional.message);
    } catch (error) {
      next(error);
    }
  }
}
