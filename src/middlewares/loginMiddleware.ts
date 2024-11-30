import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { errorResponse } from "../utils/response-utils";

const SECRET = process.env.JWT_SECRET as string;

const generateTokenAndSign = (payload: { id: number, name: string, email: string, role: string }, expiresIn = '7d') => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn
  }
  return jwt.sign(payload, SECRET, jwtConfig);
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return errorResponse(401, "Token inválido");
    const tokenValue = token.split(' ')[1];
    if (!tokenValue) return errorResponse(401, "Token inválido");
    const decoded = jwt.verify(token, SECRET);
    res.locals.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
}

export { generateTokenAndSign, verifyToken };
