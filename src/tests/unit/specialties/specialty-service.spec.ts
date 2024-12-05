import Specialty from "../../../models/specialty";
import SpecialtyService from "../../../services/specialty-service";

jest.mock('../../../models/specialty');

describe('SpecialtyService', () => {
  let specialtyService: SpecialtyService;
  beforeEach(() => {
    specialtyService = new SpecialtyService();
  });
  describe('createSpecialty', () => {
    it('should be create a new speciality', async () => {
      const specialtyMock = {
        name: "barba",
        description: "teste descricao"
      };
      const response = await specialtyService.createSpecialty(specialtyMock);
      expect(Specialty.create).toHaveBeenCalledWith({
        name: "barba",
        description: "teste descricao"
      });
      expect(response).toEqual({
        status: 201,
        message: "Especialidade criada com sucesso"
      });
    });
  });
  describe('getAllSpecialties', () => {
    it('should be get all specialities', async () => {
      const specialtiesMock = [
        { id: 1, name: 'barba1', description: 'especialidade1' },
        { id: 2, name: 'barba2', description: 'especialidade2' },
        { id: 3, name: 'barba3', description: 'especialidade3' },
      ];
      (Specialty.findAll as jest.Mock).mockResolvedValue(specialtiesMock);
      const response = await specialtyService.getAllSpecialties();
      expect(Specialty.findAll).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        status: 200,
        message: specialtiesMock,
      });
    });
  });

  describe('getSpecialtyById', () => {
    it('should be get specialty by id', async () => {
      const specialtyIdMock = '1';
      const specialtyMock = {
        id: 1,
        name: 'teste',
        description: 'teste description',
      };
      (Specialty.findByPk as jest.Mock).mockResolvedValue(specialtyMock);
      const response = await specialtyService.getSpecialtyById(specialtyIdMock);

      expect(Specialty.findByPk).toHaveBeenCalledWith(specialtyIdMock);
      expect(Specialty.findByPk).toHaveBeenCalledTimes(1);

      expect(response).toEqual({
        status: 200,
        message: specialtyMock,
      });
    });

    it('should be return error when specialty not found', async () => {
      const specialtyIdMock = '1';
      (Specialty.findByPk as jest.Mock).mockResolvedValue(null);
      const response = await specialtyService.getSpecialtyById(specialtyIdMock);
      expect(Specialty.findByPk).toHaveBeenCalledWith(specialtyIdMock)
      expect(Specialty.findByPk).toHaveBeenCalledTimes(1);
      expect(response).toEqual({
        message: { message: 'Especialidade não encontrada' },
        status: 404
      });
    });
  });

})
