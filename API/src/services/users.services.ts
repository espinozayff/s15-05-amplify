import userManager from "../models/mongo.manager";
import { Types } from "mongoose";

interface UserData {
  email: string;
  password: string;
  avatar?: string;
  username: string;
  name: string;
  last_name: string
}

class UserService {
  private model: typeof userManager;

  constructor(model: typeof userManager) {
    this.model = model;
  }

  create = async (data: UserData): Promise<any> => {
    try {
      const user = await this.model.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  };

  read = async ({}): Promise<any> => {
    try {
      const response = await this.model.read();
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (id: Types.ObjectId): Promise<any> => {
    try {
      const response = await this.model.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id: Types.ObjectId, data: Partial<UserData>): Promise<any> => {
    try {
      const response = await this.model.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (id: Types.ObjectId): Promise<any> => {
    try {
      const response = await this.model.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService(userManager);

