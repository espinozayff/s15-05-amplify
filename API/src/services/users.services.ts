import userManager from "../models/mongo.manager";
import { Types } from "mongoose";

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

class UserService {
  private model: typeof userManager;

  constructor(model: typeof userManager) {
    this.model = model;
  }

  create = async (data: UserData): Promise<any> => {
    try {
      const user = await this.model.create(data);
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  read = async ({
    filter,
    sortAndPaginate,
  }: {
    filter: Filter;
    sortAndPaginate?: SortAndPaginate | undefined;
  }): Promise<any> => {
    try {
      const response = await this.model.read({ filter: any });
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

  update = async (
    id: Types.ObjectId,
    data: Partial<UserData>
  ): Promise<any> => {
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

const userService = new UserService(userManager);

export default userService;
