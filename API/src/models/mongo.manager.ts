import User from "./users.model";
import { IUser } from "./users.model";
import { Types, Document, Model } from "mongoose";

interface userData {
  email: string;
  password: string;
  avatar?: string;
  username: string;
}

class MongoManager<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: userData): Promise<Document> {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read(): Promise<T[]> {
    try {
      const all = await this.model.find({});
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id: Types.ObjectId): Promise<T | null> {
    try {
      const one = await this.model.findById(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id: Types.ObjectId, data: Partial<T>): Promise<T | null> {
    try {
      const options = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, options);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async destroy(id: Types.ObjectId): Promise<T | null> {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const userManager = new MongoManager(User);

export default userManager;