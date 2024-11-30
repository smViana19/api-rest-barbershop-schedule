import { NextFunction, Request, Response } from "express";
import UserService from "../services/user-service";

export default class UserController {
  private userService = new UserService();
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;
      const response = await this.userService.createUser({ name, email, password, role });
      res.status(response.status).json(response.message) //conferir se e o .data ou .message
    } catch (error) {
      next(error);
    }
  }
  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.userService.getAllUsers()
      res.status(status).json(message)
    } catch (error) {
      next(error)
    }
  }
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {

    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {

    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (error) {

    }
  }

}