import { Router } from "express";
import multer from "multer";
import { getTracks, postTrack, getTrackLikes } from "../controllers/tracks.controller";

const upload = multer({ dest: "uploads/" });
const tracksRouter = Router();

tracksRouter.get("/", getTracks);
tracksRouter.post("/", upload.single("file"), postTrack);
tracksRouter.get("/:tid/likes", getTrackLikes);

export default tracksRouter;
