import jwt from "jsonwebtoken";
import { userService } from "../services/users.services";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

interface UserData {
  email: string;
  password: string;
  avatar?: string;
  username: string;
}

class UsersController {
  private service: typeof userService;

  constructor(service: typeof userService) {
    this.service = service;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const data = req.body as UserData;
      const response = await this.service.create(data);
      return res.json({ statusCode: 201, response });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
  
      if (!(email && password)) {
        return res.status(400).send("Indica email y/o contraseña");
      }
  
      //const user = users.find((us) => us.email === email);
  
      // if (user && (await bcrypt.compare(password, user.password))) {
      //   const token = jwt.sign({ email }, JWT_KEY as string, {
      //     expiresIn: "24h",
      //   });
      //   user.token = token;
       // return res.status(200).json(user);
      // } else {
        return res.status(403).send("Credenciales inválidas");
      // }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  read = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const response = await this.service.read({});
      return res.json({ statusCode: 200, response });
    } catch (error) {
      next(error);
    }
  };

  readOne = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const { uid } = req.params;
      const response = await this.service.readOne(new Types.ObjectId(uid));
      if (response) {
        return res.json({statusCode: 200, response});
      } else {
        res.json({ statusCode: 404, message: "Not Found" });
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const { uid } = req.params;
      const data = req.body as Partial<UserData>;
      const response = await this.service.update(new Types.ObjectId(uid), data);
      if (response) {
        return res.json({response, statusCode: 200});
      } else {
        res.json({ statusCode: 404, message: "Not Found" });
      }
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const { uid } = req.params;
      const response = await this.service.destroy(new Types.ObjectId(uid));
      if (response) {
        return res.json({ statusCode: 200, response });
      } else {
        res.json({ statusCode: 404, message: "Not Found" });
      }
    } catch (error) {
      next(error);
    }
  };
}

const controller = new UsersController(userService);

export const { create, login, read, readOne, update, destroy } = controller;