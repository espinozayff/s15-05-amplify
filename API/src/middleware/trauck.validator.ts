import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const trackValidator = [
    body("title").notEmpty().withMessage("El titulo es obligatorio"),
    body("genrer").notEmpty().withMessage("El genero es obligatorio"),
    body("user").notEmpty().withMessage("El id del usuario es obligatorio"),
    body("image").notEmpty().withMessage("La image es obligatorio"),
    body("songData").notEmpty().withMessage("La canción es obligatorio")
]

export const handleUserValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };