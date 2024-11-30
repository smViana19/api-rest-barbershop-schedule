import { ModelStatic } from "sequelize";
import { generateTokenAndSign } from "../middlewares/loginMiddleware";
import { errorResponse, successResponse } from "../utils/response-utils";
import bcrypt from 'bcryptjs';
import User from "../models/user";
export default class AuthService {
  private model: ModelStatic<User> = User;
  public async login(body: { email: string, password: string }) {
    try {
      const user = await this.model.findOne({
        where: {
          email: body.email
        }
      });
      if (!user) return errorResponse(404, "Usuario nao encontrado");
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) return errorResponse(401, "Senha incorreta");

      const { password, ...userData } = user;
      const token = generateTokenAndSign(userData);
      return successResponse(200, { ...userData, token });

    } catch (error) {
      throw new Error("Erro ao fazer login");
    }
  }
}