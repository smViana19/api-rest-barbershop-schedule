import { ModelStatic } from "sequelize";
import Availability from "../models/availability";
import IAvailability from "../interfaces/IAvailability";
import { errorResponse, successResponse } from "../utils/response-utils";
import Professional from "../models/professional";
import User from "../models/user";
import AppError from "../utils/error-util";
import { addDays, endOfMonth, isBefore, startOfMonth } from "date-fns";
export default class AvailabilityService {

  private availability: ModelStatic<Availability> = Availability;
  private professional: ModelStatic<Professional> = Professional;

  public async createAvailabilityForWeek(professionalId: number, startDate: Date, endDate: Date, startTime: string, endTime: string) {
    try {
      const today = new Date()
      if (isBefore(startDate, today)) {
        return errorResponse(400, "A data é inválida")
      }
      const weekDays = [0, 1, 2, 3, 4, 5, 6]
      let currentDate = new Date(startDate)
      while (isBefore(currentDate, endDate)) {
        const dayOfWeek = currentDate.getDate()
        if (weekDays.includes(dayOfWeek)) {
          const slots = this.createTimeSlots(currentDate, startTime, endTime)
          for (const slot of slots) {
            await this.availability.create({
              professionalId,
              date: currentDate,
              time: slot,
              isAvailable: true
            })
          }
          currentDate = addDays(currentDate, 1)
        }
      }
      return successResponse(200, "Disponibilidade gerada com sucesso.")
    } catch (error) {
      throw new Error("Erro ao criar disponibilidade")
    }
  }


  public async createAvailability(availability: IAvailability) {
    const dateValid = (date: Date) => {
      const today = new Date()
      return !isBefore(date, today)
    }
    try {
      const professional = await this.professional.findByPk(availability.professionalId);
      if (!dateValid(availability.date)) {
        return errorResponse(400, "Não é possível criar disponibilidade em uma data passada.")
      }
      if (!professional) return errorResponse(404, "Profissional não encontrado")
      const createAvailability = await this.availability.create({ ...availability })
      return successResponse(201, "Horario disponivel criado com sucesso", createAvailability)
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar horario disponivel');
    }
  }

  public async getAllAvailabilities() {
    try {
      const availabilities = await this.availability.findAll();
      return successResponse(200, availabilities);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao listar os horarios disponiveis');
    }
  }

  public async getAvailabilityById(availabilityId: string) {
    try {
      const availability = await this.availability.findByPk(availabilityId);
      if (!availability) return errorResponse(404, "Horario não encontrado");
      return successResponse(200, availability);
    } catch (error) {
      console.error(error);
      throw new Error('');
    }
  }
  public async getAvailabilityByProfesionalId(professionalId: string) {
    try {
      const professional = await this.professional.findByPk(professionalId);
      if (!professional) return errorResponse(404, "Profissional não encontrado")
      const availabilities = await this.availability.findAll({
        where: {
          professionalId,
          isAvailable: true,
        },
        attributes: ['id', 'date', 'time'],
        order: [['date', 'ASC'], ['time', 'ASC']]
      })
      if (availabilities.length === 0) {
        return errorResponse(404, "Não há horários disponiveis");
      }
      return successResponse(200, availabilities);
    } catch (error) {
      console.error(error);
      throw new AppError(500, "Erro ao listar horarios disponiveis do profissional")
    }
  }

  public async updateAvailability(availabilityId: string, availabilityData: IAvailability) {
    try {
      const availability = await this.availability.findByPk(availabilityId);
      if (!availability) return errorResponse(404, "Horario não encontrado");
      const updatedAvailability = await availability.update({ ...availabilityData });
      return successResponse(200, updatedAvailability);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao editar o horario');
    }
  }

  public async deleteAvailability(availabilityId: string) {
    try {
      const availability = await this.availability.findByPk(availabilityId);
      if (!availability) return errorResponse(404, "Horario não encontrado");
      await availability.destroy();
      return successResponse(203);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao excluir o horario');
    }
  }

  private createTimeSlots(date: Date, startTime: string, endTime: string) {
    const slots = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      slots.push(currentTime);
      currentTime = this.addServiceTime(currentTime, 60); //TODO: TROCAR PARA O TIME DO SERVICO DIRETEMNTE
    }
    return slots
  }

  //TODO: ADAPTAR A FUNCAO PARA RECEBER O SERVICE TIME
  private addServiceTime(time: string, minutesToAdd: number): string {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(0, 0, 0, hours, minutes + minutesToAdd);
    return date.toISOString().substr(11, 5);
  }
}
