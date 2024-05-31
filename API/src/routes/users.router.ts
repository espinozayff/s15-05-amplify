import { Router } from "express";
import { create, read, readOne, update, destroy } from "../controllers/user.controller";

const usersRouter = Router();

usersRouter.post("/", create);
usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

export default usersRouter;