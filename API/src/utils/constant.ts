import dotenv from "dotenv";
dotenv.config();

export const port: string | undefined = process.env.PORT;
export const db: string = process.env.DB || "";
export const jwtKey: string = process.env.JWT_KEY || "";
export const secretKey: string = process.env.JWT_SECRET || "";
export const secret: string = process.env.SECRET || "";
export const CLOUDINARY_NAME: string = process.env.CLOUDINARY_NAME || "";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || "";
