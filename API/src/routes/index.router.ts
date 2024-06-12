import { Router } from "express";
import usersRouter from "./users.router";
import albumsRouter from "./albums.router";
import tracksRouter from "./tracks.router";
import genrerRouter from "./genrer.router";
import exampleRoute from './example.router';

const apiRouter = Router()

apiRouter.use("/api/users", usersRouter);
apiRouter.use("/api/albums", albumsRouter);
apiRouter.use("/api/tracks", tracksRouter);
apiRouter.use("/api/genrer", genrerRouter);
apiRouter.use('/', exampleRoute);

export default apiRouter

