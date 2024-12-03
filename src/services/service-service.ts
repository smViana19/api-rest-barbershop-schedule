import { ModelStatic } from "sequelize";
import Service from "../models/service";
import IService from "../interfaces/IService";
import { errorResponse, successResponse } from "../utils/response-utils";

export default class ServiceService {
  private service: ModelStatic<Service> = Service;

  public async createService(service: IService) {
    try {
      const createService = await this.service.create({ ...service })
      return successResponse(201, 'Serviço criado com suceso', createService)
    } catch (error) {
      throw new Error('Erro ao criar serviço');
    }
  }

  public async getAllServices() {
    try {
      const services = await this.service.findAll();
      return successResponse(200, services);
    } catch (error) {
      throw new Error('Erro ao listar os serviços');
    }
  }

  public async getServiceById(serviceId: string) {
    try {
      const service = await this.service.findByPk(serviceId);
      if (!service) return errorResponse(404, "Serviço não encontrado");
      return successResponse(200, service);
    } catch (error) {
      throw new Error('Erro ao mostrar serviço');
    }
  }

  public async updateService(serviceId: string, serviceData: IService) {
    try {
      const service = await this.service.findByPk(serviceId);
      if (!service) return errorResponse(404, "Serviço não encontrado");
      const updatedService = await service.update({ ...serviceData });
      return successResponse(200, updatedService);
    } catch (error) {
      throw new Error('Erro ao editar o serviço');
    }
  }

  public async deleteService(serviceId: string) {
    try {
      const service = await this.service.findByPk(serviceId);
      if (!service) return errorResponse(404, "Serviço não encontrado");
      await service.destroy()
      return successResponse(203);
    } catch (error) {
      throw new Error('Erro ao excluir profissional');
    }
  }
}