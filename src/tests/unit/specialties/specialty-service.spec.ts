import Specialty from "../../../models/specialty";
import SpecialtyService from "../../../services/specialty-service";

jest.mock('../../../models/specialty');

describe('SpecialtyService', () => {
  let specialtyService: SpecialtyService;
  beforeEach(() => {
    specialtyService = new SpecialtyService();
  });
  describe('create', () => {
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
  })

})
