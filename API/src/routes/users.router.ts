import { Router } from "express";
import {
  create,
  login,
  logout,
  read,
  readOne,
  update,
  destroy,
  like
} from "../controllers/user.controller";

import { verifyToken, destroyToken} from "../middleware/auth";


const usersRouter = Router();

usersRouter.post("/", create);
usersRouter.post("/login", login);
usersRouter.post("/logout", destroyToken, logout);
usersRouter.get("/", verifyToken, read);
usersRouter.get("/:uid", readOne);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);
usersRouter.put("/likes/:tid", verifyToken, like)

export default usersRouter;
