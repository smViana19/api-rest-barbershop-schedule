import { NextFunction, Request, Response } from "express";
import AppointmentService from "../services/appointment-service";
import AvailabilityService from "../services/availability-service";

export default class AppointmentController {
  private appointmentService = new AppointmentService();

  public async createAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, professionalId, serviceId, availabilityId, status, details } = req.body;
      const appointment = await this.appointmentService.createAppointment({ userId, professionalId, serviceId, availabilityId, status, details });
      res.status(appointment.status).json({ ...appointment });
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
      const appointment = await this.appointmentService.getAppointmentById(appointmentId);
      res.status(appointment.status).json(appointment.message);
    } catch (error) {
      next(error)
    }
  }

  public async getAppointmentsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const appointment = await this.appointmentService.getAppointmentsByUserId(userId);
      res.status(appointment.status).json(appointment.message)
    } catch (error) {
      next(error)
    }
  }

  public async updateAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { appointmentId } = req.params;
      const appointment = await this.appointmentService.updateAppointment(appointmentId, { ...req.body });
      res.status(appointment.status).json(appointment.message);
    } catch (error) {
      next(error)
    }
  }

  public async deleteAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const { appointmentId } = req.params;
      const appointment = await this.appointmentService.deleteAppointment(appointmentId);
      res.status(appointment.status).json(appointment.message);
    } catch (error) {
      next(error)
    }
  }
}