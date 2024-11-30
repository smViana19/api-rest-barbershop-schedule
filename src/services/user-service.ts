import bcrypt from 'bcryptjs';
import { ModelStatic } from "sequelize";
import IUser from "../interfaces/IUser";
import User from "../models/user";
import { successResponse } from "../utils/response-utils";
export default class UserService {
  private model: ModelStatic<User> = User;

  public async createUser(user: IUser) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.model.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role
      });
      return successResponse(201, createdUser)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public async getAllUsers() {
    try {
      const users = await this.model.findAll({
        attributes: ['id', 'name', 'email', 'role']
      });
      return successResponse(200, users);
    } catch (error) {
      throw new Error("Erro ao buscar os usuarios");
    }
  }

  public async updateUser() {
    try {

    } catch (error) {

    }
  }

  public async getUserById() {
    try {

    } catch (error) {

    }
  }

  public async deleteUser() {
    try {

    } catch (error) {

    }
  }
}