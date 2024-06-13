import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


const JWT_KEY = process.env.JWT_KEY as string;
const invalidTokens: string[] = [];
if (!JWT_KEY) {
  throw new Error("JWT_KEY no está definido. Asegúrate de configurarlo en tus variables de entorno.");
}

interface DecodedToken {
  id: string
  email: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user?: DecodedToken;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.headers["x-access-token"] as string | undefined;

  if (!token) {
    return res.status(403).send("No se ha enviado el token de autenticación");
  }

  if (invalidTokens.includes(token)) {
    return res.status(401).send("Token inválido");
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY) as DecodedToken;
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).send("Token inválido");
  }
};

export const destroyToken = (req: Request, res: Response) => {
  const token = req.headers["x-access-token"] as string;

  if (invalidTokens.includes(token)) {
    return res.status(400).send("El token ya está invalidado");
  }

  invalidTokens.push(token);
  return res.status(200).send("Logout exitoso");
};





