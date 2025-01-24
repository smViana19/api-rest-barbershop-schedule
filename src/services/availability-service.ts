import { ModelStatic } from "sequelize";
import Availability from "../models/availability";
import IAvailability from "../interfaces/IAvailability";
import { errorResponse, successResponse } from "../utils/response-utils";
import Professional from "../models/professional";
import User from "../models/user";
import AppError from "../utils/error-util";
import { addDays, endOfMonth, isBefore, startOfMonth } from "date-fns";
import { formatTime } from "../utils/format-time-utils";
export default class AvailabilityService {

  private availability: ModelStatic<Availability> = Availability;
  private professional: ModelStatic<Professional> = Professional;

  /**
   * Cria a disponibilidade de um profissional para toda uma semana, gerando slots de tempo 
   * entre as datas de início e fim, com base no horário de início e fim especificados.
   * 
   * @param {number} professionalId - O ID do profissional para o qual a disponibilidade está sendo gerada.
   * @param {Date} startDate - A data inicial para o período da disponibilidade.
   * @param {Date} endDate - A data final para o período da disponibilidade.
   * @param {string} startTime - O horário de início da disponibilidade no formato "HH:mm".
   * @param {string} endTime - O horário de término da disponibilidade no formato "HH:mm".
   * @returns {Promise<object>} Retorna um objeto de sucesso ou erro após a criação da disponibilidade. 
   *                            Caso a criação seja bem-sucedida, retorna uma mensagem de sucesso e os slots gerados.
   * 
   * @throws {Error} Lança um erro se ocorrer um problema ao gerar a disponibilidade.
   * 
   * @example
   * createAvailabilityForWeek(1, new Date('2025-01-01'), new Date('2025-01-07'), "08:00", "17:00")
   * // Retorna: successResponse(200, "Disponibilidade gerada com sucesso.", ["08:00", "09:00", ..., "16:00"])
   */

  public async createAvailabilityForWeek(professionalId: number, startDate: Date, endDate: Date, startTime: string, endTime: string) {
    try {
      console.log("chegou aq 1");

      const today = new Date()
      if (isBefore(startDate, today)) {
        return errorResponse(400, "A data inicial não pode ser anterior a hoje.")
      }
      const weekDays = [0, 1, 2, 3, 4, 5, 6]
      let currentDate = new Date(startDate)
      let slot: string[] = []
      while (isBefore(currentDate, endDate)) {
        console.log("chegou aq while");
        const dayOfWeek = currentDate.getDay()
        if (weekDays.includes(dayOfWeek)) {
          const slots = this.generateTimeSlots(startTime, endTime, 60)
          slot = slots
          console.log("slots:", slots)

          for (const slot of slots) {
            console.log("slots:", slot)
            await this.availability.create({
              professionalId,
              date: currentDate,
              time: slot,
              isAvailable: true
            })
          }
        }
        currentDate = addDays(currentDate, 1)
      }
      return successResponse(200, "Disponibilidade gerada com sucesso.", slot)
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

  /**
   * Gera uma lista de intervalos de tempo (slots) entre um horário de início e um horário de fim, 
   * com base no intervalo de tempo especificado em minutos.
   * 
   * @param {string} startTime - O horário inicial no formato "HH:mm".
   * @param {string} endTime - O horário final no formato "HH:mm".
   * @param {number} [intervalInMinutes=60] - O intervalo de tempo em minutos entre cada slot. O padrão é 60 minutos.
   * @returns {string[]} Uma lista de horários (slots) no formato "HH:mm", com o intervalo definido.
   * 
   * @example
   * generateTimeSlots("08:00", "12:00", 60);
   * // Retorna: ["08:00", "09:00", "10:00", "11:00"]
   */


  private generateTimeSlots(startTime: string, endTime: string, intervalInMinutes = 60) {
    const slots = [];
    let currentTime = startTime;
    while (currentTime < endTime) {
      slots.push(currentTime);
      currentTime = this.incrementTimeByMinutes(currentTime, intervalInMinutes);
    }
    return slots
  }

  /**
   * Increments a given time by a specified number of minutes.
   * 
   * @param {string} time - The initial time in the format "HH:mm".
   * @param {number} minutesToAdd - The number of minutes to add to the given time.
   * @returns {string} The new time after adding the specified minutes, formatted as "HH:mm".
   * 
   * @example
   * incrementTimeByMinutes("08:30", 90);
   * // Returns: "10:00"
   */

  private incrementTimeByMinutes(time: string, minutesToAdd: number): string {

    const timeParts = time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10)
    const totalMinutes = hours * 60 + minutes + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return formatTime(newHours, newMinutes);
  }
}
