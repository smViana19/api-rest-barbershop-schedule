import { NextFunction, Request, Response } from 'express';

export default function erroHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Erro interno no servidor',
  });
}
