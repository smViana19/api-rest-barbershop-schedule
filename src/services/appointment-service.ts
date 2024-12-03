// import { ModelStatic } from "sequelize";
// import Appointment from "../models/appointment";
// import IAppointment from "../interfaces/IAppointment";
// import { errorResponse, successResponse } from "../utils/response-utils";

// export default class AppointmentService {
//   private appointment: ModelStatic<Appointment> = Appointment;
//   public async createAppointment(appointment: IAppointment) {
//     try {
//       const createAppointment = await this.appointment.create({ ...appointment });
//       return successResponse(201, createAppointment);
//     } catch (error) {
//       throw new Error("Erro ao criar horario de disponibilidade");
//     }
//   }

//   public async getAllAppointments() {
//     try {
//       const appointments = await this.appointment.findAll()
//       return successResponse(200, appointments);
//     } catch (error) {
//       throw new Error("Nenhum horário encontrado");
//     }
//   }

//   public async getAppointmentById(appointmentId: string) {
//     try {
//       const appointment = await this.appointment.findByPk(appointmentId)
//       if (!appointment) return errorResponse(404, "Horário não encontrado");
//       return successResponse(200, appointment);
//     } catch (error) {
//       throw new Error("Erro ao buscar o horário");
//     }
//   }

//   public async getAppointmentsByUserId(userId: string) {
//     try {

//     } catch (error) {

//     }
//   }

//   public async updateAppointment(appointmentId: string) {
//     try {

//     } catch (error) {

//     }
//   }

//   public async deleteAppointment(appointmentId: string) {
//     try {

//     } catch (error) {

//     }
//   }

// }
