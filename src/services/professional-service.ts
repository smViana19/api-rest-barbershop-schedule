import Professional from '../models/professional';
import IProfessional from '../interfaces/IProfessional';
import { ModelStatic } from 'sequelize';
import { errorResponse, successResponse } from '../utils/response-utils';
import User from '../models/user';
import Specialty from '../models/specialty';

export default class ProfessionalService {
  private professional: ModelStatic<Professional> = Professional;

  public async createProfessional(professional: IProfessional) {
    try {
      const createProfessional = await this.professional.create({
        ...professional,
      });
      return successResponse(201, 'Criado com sucesso', createProfessional);
    } catch (error) {
      console.error('erro ao criar profissional: ', error);
      throw new Error('Erro ao criar profissional');
    }
  }

  public async getAllProfessionals() {
    try {
      const professionals = await this.professional.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Specialty,
            attributes: ['name'],
          },
        ],
      });
      return successResponse(200, professionals);
    } catch (error) {
      console.error('error service getall: ', error);
      throw new Error('Erro ao buscar profissionais');
    }
  }

  public async getProfessionalById(professionalId: string) {
    try {
      const professional = await this.professional.findByPk(professionalId, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Specialty,
            attributes: ['name'],
          },
        ],
      });
      if (!professional)
        return errorResponse(404, 'Profissional não encontrado');
      return successResponse(200, professional);
    } catch (error) {
      throw new Error('Erro ao mostrar profissional');
    }
  }

  public async updateProfessional(
    professionalId: string,
    professionalData: IProfessional
  ) {
    try {
      const professional = await this.professional.findByPk(professionalId);
      if (!professional)
        return errorResponse(404, 'Profissional não encontrado');
      const updatedProfessional = await professional.update({
        ...professionalData,
      });
      return successResponse(200, updatedProfessional);
    } catch (error) {
      throw new Error('Erro ao editar o profissional');
    }
  }

  public async deleteProfessional(professionalId: string) {
    try {
      const professional = await this.professional.findByPk(professionalId);
      if (!professional)
        return errorResponse(404, 'Profissional não encontrado');
      await professional.destroy();
      return successResponse(203);
    } catch (error) {
      throw new Error('Erro ao excluir o profissional');
    }
  }
}
