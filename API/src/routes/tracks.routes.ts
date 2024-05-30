import Express from "express";
import multer from "multer";
import { getTracks, postTrack } from "../controllers/tracks";

const upload = multer({ dest: "uploads/" });
const router = Express.Router();

router.get("/", getTracks);
router.post("/", upload.single("file"), postTrack);

export default router;