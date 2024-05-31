import Express from "express";
import multer from "multer";
import { getTracks, postTrack,getOneTrack } from "../controllers/tracks.controller";

const upload = multer({ dest: "uploads/" });
const router = Express.Router();

router.get("/", getTracks);
router.get("/", getOneTrack);
router.post("/", upload.single("file"), postTrack);

export default router;