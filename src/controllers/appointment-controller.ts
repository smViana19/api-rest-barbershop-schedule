import { NextFunction, Request, Response } from "express";
import AppointmentService from "../services/appointment-service";

export default class AppointmentController {
  private appointmentService = new AppointmentService();

  public async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, professionalId, serviceId, availabilityId, status } = req.body;
      const response = await this.appointmentService.createAppointment({ userId, professionalId, serviceId, availabilityId, status });
      res.status(response.status).json({ ...response });
    } catch (error) {
      next(error)
    }
  }

  public async getAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.appointmentService.getAllAppointments();
      res.status(status).json(message);
    } catch (error) {
      next(error)
    }
  }

  public async getAppointmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { appointmentId } = req.params;
      const response = await this.appointmentService.getAppointmentById(appointmentId);
      res.status(response.status).json(response.message);
    } catch (error) {
      next(error)
    }
  }

  public async getAppointmentsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const response = await this.appointmentService.getAppointmentsByUserId(userId);
      res.status(response.status).json(response.message)
    } catch (error) {
      next(error)
    }
  }

  public async updateAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (error) {
      next(error)
    }
  }

  public async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {
      next(error)
    }
  }
}