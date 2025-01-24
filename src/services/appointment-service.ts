import { ModelStatic } from "sequelize";
import Appointment from "../models/appointment";
import IAppointment from "../interfaces/IAppointment";
import { errorResponse, successResponse } from "../utils/response-utils";
import AppError from "../utils/error-util";
import User from "../models/user";
import Availability from "../models/availability";
import Service from "../models/service";
import Professional from "../models/professional";

export default class AppointmentService {
  private appointment: ModelStatic<Appointment> = Appointment;
  private availability: ModelStatic<Availability> = Availability
  private user: ModelStatic<User> = User;
  public async createAppointment(appointment: IAppointment) {
    try {
      const createAppointment = await this.appointment.create({ ...appointment });
      await this.availability.update(
        { isAvailable: false },
        {
          where: {
            id: appointment.availabilityId
          }
        }
      )
      return successResponse(201, createAppointment);
    } catch (error) {
      console.error(error)

      throw new AppError(500, "Erro ao agendar horário");
    }
  }

  public async getAllAppointments() {
    try {
      const appointments = await this.appointment.findAll({
        include: [
          {
            where: {
              isAvailable: true,
            },
            model: Availability,
            attributes: ['date', 'time'],
          },
          {
            model: Service,
            attributes: ['name', 'price'],
          },
          {
            model: Professional,
            include: [
              {
                model: User,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      return successResponse(200, appointments);
    } catch (error) {
      console.error(error)
      throw new AppError(500, "Nenhum agendamento encontrado");
    }
  }

  public async getAppointmentById(appointmentId: string) {
    try {
      const appointment = await this.appointment.findByPk(appointmentId)
      if (!appointment) return errorResponse(404, "Agendamento não encontrado");
      return successResponse(200, appointment);
    } catch (error) {
      throw new AppError(500, "Erro ao buscar o agendamento");
    }
  }

  public async getAppointmentsByUserId(userId: string) {
    try {
      const user = await this.user.findByPk(userId);
      if (!user) return errorResponse(404, "Usuário não encontrado");
      const appointments = await this.appointment.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: Availability,
            attributes: ['date', 'time'],
          }
        ]
      });
      if (appointments.length === 0) {
        return errorResponse(404, "Sem agendamentos");
      }
      return successResponse(200, appointments);
    } catch (error) {
      throw new AppError(500, "Erro ao buscar agendamentos do usuario");
    }
  }

  public async updateAppointment(appointmentId: string, appointmentData: IAppointment) {
    try {
      const appointment = await this.appointment.findByPk(appointmentId)
      if (!appointment) return errorResponse(404, "Agendamento não encontrado");
      const updatedAppointment = await appointment.update({ ...appointmentData });
      return successResponse(200, updatedAppointment);
    } catch (error) {
      throw new AppError(500, "Erro ao editar o agendamento");
    }
  }

  public async deleteAppointment(appointmentId: string) {
    try {
      const appointment = await this.appointment.findByPk(appointmentId)
      if (!appointment) return errorResponse(404, "Agendamento não encontrado");
      await appointment.destroy();
      return successResponse(203)
    } catch (error) {
      throw new AppError(500, "Erro ao excluir agendamento");
    }
  }

}
