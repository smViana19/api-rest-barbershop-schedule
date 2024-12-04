import { ModelStatic } from "sequelize";
import Availability from "../models/availability";
import IAvailability from "../interfaces/IAvailability";
import { errorResponse, successResponse } from "../utils/response-utils";
import Professional from "../models/professional";
import User from "../models/user";
import AppError from "../utils/error-util";
export default class AvailabilityService {
  private availability: ModelStatic<Availability> = Availability;
  private professional: ModelStatic<Professional> = Professional;
  public async createAvailability(availability: IAvailability) {
    try {
      const professional = await this.professional.findByPk(availability.professionalId);
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
        attributes: ['date', 'time']
      })
      if (availabilities.length === 0) {
        return errorResponse(404, "Não há horários disponiveis");
      }
      //QUERY INTEIRA PARA CASO PRECISE FUTURAMENTE
      // const availabilities = await this.availability.findAll({
      //   where: {
      //     professionalId,
      //     isAvailable: true
      //   },
      //   include: [
      //     {
      //       model: Professional,
      //       attributes: ['userId', 'specialtyId'],
      //       include: [
      //         {
      //           model: User,
      //           attributes: ['name']
      //         }
      //       ]
      //     }
      //   ]
      // });
      return successResponse(200, availabilities);
    } catch (error) {
      console.error(error);
      throw new AppError("Erro ao listar horarios disponiveis do profissional", 500)
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
}
