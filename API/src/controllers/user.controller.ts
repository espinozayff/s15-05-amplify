import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userService } from "../services/users.services";
import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";
import { jwtKey } from "../utils/constant";
import Soundtrack from "../models/tracks.model";

const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) {
  throw new Error("JWT_KEY no está definido. Asegúrate de configurarlo en tus variables de entorno.");
}

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

interface CustomRequest extends Request {
  user?: DecodedToken;
}

interface UserData {
  email: string;
  password: string;
  avatar?: string;
  username: string;
  name: string;
  last_name: string;
}

class UsersController {
  private service: typeof userService;

  constructor(service: typeof userService) {
    this.service = service;
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void | Object> => {
    try {
      const data = req.body as UserData;
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      const response = await this.service.create(data);
      return res.status(201).json({ statusCode: 201, response });
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

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("email incorrecto");
      }

      const authorization = await bcrypt.compare(password, user.password);
      const id = user._id;
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({email, id}, jwtKey, {

          expiresIn: "24h",
        });

        const userWithToken = {
          _id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
          last_name: user.last_name,
          avatar: user.avatar,
          favorite: user.favorite,
          my_music: user.my_music,
          playlists: user.playlists,
          albums: user.albums,
          events: user.events,
          token,
        };

        return res.status(200).json(userWithToken);
      } else {
        return res.status(403).send("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      return res.status(500).send("Internal Server Error");
    }
  };
  
    logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      const token = req.headers.cookie;
      if (!token) {
        return res.status(400).send("Token no proporcionado");
      }
      req.headers["x-access-token"] = "";
      
      return res.status(200).send("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      return res.status(500).send("Error interno del servidor");
    }
  };




  read = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Object> => {
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
        return res.json({ statusCode: 200, response });
      } else {
        res.status(404).json({ statusCode: 404, message: "Not Found" });
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
        return res.json({ response, statusCode: 200 });
      } else {
        res.status(404).json({ statusCode: 404, message: "Not Found" });
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
        res.status(404).json({ statusCode: 404, message: "Not Found" });
      }
    } catch (error) {
      next(error);
    }
  };

  like = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { tid } = req.params;
      const userEmail = req.user?.email;

      if (!userEmail) {
        return res.status(403).send("Usuario no autenticado");
      }

      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      const song = await Soundtrack.findById(tid);
      if (!song) {
        return res.status(404).send("Canción no encontrada");
      }

      if (!Array.isArray(song.likes)) {
        song.likes = [];
      }

      const hasLiked = song.likes.some(userId => userId.equals(user._id));
      if (hasLiked) {
        song.likes = song.likes.filter(userId => !userId.equals(user._id));
        user.favorite = user.favorite.filter(songId => !songId.equals(song._id));
      } else {
        song.likes.push(user._id);
        user.favorite.push(song._id);
      }

      await user.save();
      await song.save();

      return res.status(200).json({ message: "Like actualizado" });
    } catch (error) {
      next(error);
    }
  };
}

const controller = new UsersController(userService);


export const { create, login, logout, read, readOne, update, destroy, like } = controller;
