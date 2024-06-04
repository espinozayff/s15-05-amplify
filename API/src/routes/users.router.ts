import { Router } from "express";
import {
  create,
  login,
  read,
  readOne,
  update,
  destroy,
} from "../controllers/user.controller";
import auth from "../middleware/auth"

const usersRouter = Router();

usersRouter.post("/", create);
usersRouter.post("/", auth, login);
usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

export default usersRouter;
