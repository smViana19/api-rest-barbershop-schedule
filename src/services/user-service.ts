import bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import IUser from '../interfaces/IUser';
import User from '../models/user';
import { errorResponse, successResponse } from '../utils/response-utils';
export default class UserService {
  private user: ModelStatic<User> = User;

  public async createUser(user: IUser) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.user.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });
      return successResponse(201, createdUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getAllUsers() {
    try {
      const users = await this.user.findAll({
        attributes: ['id', 'name', 'email', 'role'],
      });
      return successResponse(200, users);
    } catch (error) {
      throw new Error('Erro ao buscar os usuarios');
    }
  }

  public async updateUser(userId: string, userData: IUser) {
    try {
      if (!userId) {
        return errorResponse(404, 'Usuário não encontrado');
      }
      const user = await this.user.findByPk(userId);
      if (!user) return errorResponse(404, 'Usuário não encontrado');
      const { password, ...updatedData } = userData;
      const userUpdated = await user.update(updatedData);
      return successResponse(200, userUpdated);
    } catch (error) {
      throw new Error('Erro ao editar usuario');
    }
  }

  public async getUserById(userId: string) {
    try {
      const user = await this.user.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'role'],
      });
      if (!user) return errorResponse(404, 'Usuário não encontrado');
      return successResponse(200, user);
    } catch (error) {
      throw new Error('Erro ao mostrar usuario');
    }
  }

  public async deleteUser(userId: string) {
    try {
      const user = await this.user.findByPk(userId);
      if (!user) return errorResponse(404, 'Usuário não encontrado');
      await user.destroy();
      return successResponse(203);
    } catch (error) {
      throw new Error('Erro ao deletar usuário');
    }
  }
}
