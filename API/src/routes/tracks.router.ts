import { Router } from "express";
import multer from "multer";
import tracksController from "../controllers/tracks.controller";
import { trackValidator } from "../middleware/trauck.validator";
import { verifyToken } from "../middleware/auth";


const upload = multer({ dest: "uploads/" });
const router = Router();

router.get("/", tracksController.getAllTracks);
router.get("/:id", tracksController.getTrackById);
router.post("/", verifyToken, trackValidator, upload.fields([{ name: 'songData', maxCount: 1 }, { name: 'image', maxCount: 1 }]), tracksController.createTrack);
router.put("/:id", verifyToken, upload.single('image'), tracksController.updateTrack);
router.delete("/:id", verifyToken, tracksController.daleteTrack);

export default router;

