import {Router} from "express";
import multer from "multer";
import { getTracks, postTrack } from "../controllers/tracks.controller";

const upload = multer({ dest: "uploads/" });
const tracksRouter = Router();

tracksRouter.get("/", getTracks);
tracksRouter.post("/", upload.single("file"), postTrack);

export default tracksRouter;