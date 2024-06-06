import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_KEY = process.env.JWT_KEY as string;

if (!JWT_KEY) {
  throw new Error("JWT secret is not defined");
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
    console.error("JWT verification error:", error);
    return res.status(401).send("Token inválido");
  }

  return next();
};

export default verifyToken;
