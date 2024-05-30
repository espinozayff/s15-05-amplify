import { Router } from "express";
import usersRouter from "./users.router";

const apiRouter = Router()

apiRouter.use("/api/users", usersRouter)

export default apiRouter