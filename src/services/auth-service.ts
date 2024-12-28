import { ModelStatic } from 'sequelize';
import { generateTokenAndSign } from '../middlewares/loginMiddleware';
import { errorResponse, successResponse } from '../utils/response-utils';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import AppError from '../utils/error-util';
export default class AuthService {
  private model: ModelStatic<User> = User;
  public async login(body: { email: string; password: string }) {
    try {
      const user = await this.model.findOne({
        where: {
          email: body.email,
        },
      });
      if (!user) return errorResponse(404, 'Usuario nao encontrado');
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) return errorResponse(401, 'Senha incorreta');

      const { id, name, email, role } = user;
      const token = generateTokenAndSign({ id, name, email, role });
      return successResponse(200, { id, name, email, role, token });
    } catch (error) {
      console.log(error)
      throw new AppError(500, 'Erro ao fazer login');
    }
  }
}
