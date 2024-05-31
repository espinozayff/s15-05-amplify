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

export const { create, read, readOne, update, destroy } = controller;