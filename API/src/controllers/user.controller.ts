import userService from "../services/users.services";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

class UsersController {
  private service: typeof userService;

  constructor() {
    this.service = service;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req.body as UserData;
      const response = await this.service.create(data);
      return response
    } catch (error) {
      throw error
    }
  };

  read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sortAndPaginate: SortAndPaginate = {
        limit: req.query.limit ? Number(req.query.limit) : 10,
        page: req.query.page ? Number(req.query.page) : 1,
        sort: { email: 1 }
      };

      const filter: Filter = {};

      if (req.query.email) {
        filter.email = new RegExp(req.query.email.toString().trim(), 'i');
      }

      const response = await this.service.read({ filter, sortAndPaginate });
      if (response.docs.length > 0) {
        response
      } else {
        const error = new Error
        error.message = "!Not Found"
        throw error
      }
    } catch (error) {
      throw error
    }
  };

  readOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const response = await this.service.readOne(uid: Types.ObjectId);
      if (response) {
        response
      } else {
        const error = new Error
        error.message = "!Not Found"
        throw error
      }
      const error = new Error
      error.message = "Not Found"
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const data = req.body as Partial<UserData>;
      const response = await this.service.update(uid: Types.ObjectId, data);
      if (response) {
        return res.status(200).json(response);
      }
      throw CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { uid } = req.params;
      const response = await this.service.destroy(uid);
      if (response) {
        return res.status(200).json(response);
      }
      throw CustomError.new(errors.notFound);
    } catch (error) {
      return next(error);
    }
  };
}

const controller = new UsersController();
export const { create, read, readOne, update, destroy } = controller;
export default UsersController;

interface UserData {
  email: string;
  password: string;
  avatar?: string;
  username: string;
}

interface Filter {
  [key: string]: any;
}

interface SortAndPaginate {
  sortBy?: string;
  sortOrder?: number;
  page?: number;
  limit?: number;
}
