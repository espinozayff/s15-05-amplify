import { Router } from "express";
import usersRouter from "./users.router";
import albumsRouter from "./albums.router";

const apiRouter = Router()

apiRouter.use("/api/users", usersRouter)
apiRouter.use("api/albums", albumsRouter)

export default apiRouter