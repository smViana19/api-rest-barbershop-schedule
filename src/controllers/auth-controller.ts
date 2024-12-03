import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth-service';

export default class AuthController {
  private authService = new AuthService();

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.authService.login(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}
