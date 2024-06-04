import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const { JWT_KEY } = process.env;

if (!JWT_KEY) {
  throw new Error("JWT_KEY is not defined in environment variables");
}

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

interface CustomRequest extends Request {
  user?: DecodedToken;
}

const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers["x-access-token"] as string | undefined;

  if (!token) {
    return res.status(403).send("No se ha enviado el token de autenticación");
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as DecodedToken;
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Token inválido");
  }

  return next();
};

export default verifyToken;