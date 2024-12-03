import { ModelStatic } from 'sequelize';
import Specialty from '../models/specialty';
import ISpecialty from '../interfaces/ISpecialty';
import { errorResponse, successResponse } from '../utils/response-utils';

export default class SpecialtyService {
  private specialty: ModelStatic<Specialty> = Specialty;

  public async createSpecialty(specialty: ISpecialty) {
    try {
      const createSpecialty = await this.specialty.create({ ...specialty });
      return successResponse(
        201,
        'Especialidade criada com sucesso',
        createSpecialty
      );
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar especialidade');
    }
  }

  public async getAllSpecialties() {
    try {
      const specialties = await this.specialty.findAll();
      return successResponse(200, specialties);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar especialidades');
    }
  }

  public async getSpecialtyById(specilatyId: string) {
    try {
      const specialty = await this.specialty.findByPk(specilatyId);
      if (!specialty) return errorResponse(404, 'Especialidade não encontrada');
      return successResponse(200, specialty);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar especialidade');
    }
  }

  public async updateSpecialty(specilatyId: string, specialtyData: ISpecialty) {
    try {
      const specialty = await this.specialty.findByPk(specilatyId);
      if (!specialty) return errorResponse(404, 'Especialidade não encontrada');
      const specialtyUpdated = await specialty.update({ ...specialtyData });
      return successResponse(200, specialtyUpdated);
    } catch (error) {
      throw new Error('Erro ao editar especialidade');
    }
  }

  public async deleteSpecialty(specilatyId: string) {
    try {
      const specialty = await this.specialty.findByPk(specilatyId);
      if (!specialty) return errorResponse(404, 'Especialidade não encontrada');
      await specialty.destroy();
      return successResponse(203);
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao deletar especialidade');
    }
  }
}
