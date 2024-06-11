import {Router} from "express";
import multer from "multer";
const router = Router();
import genrerController from "../controllers/genrer.controller";
import verifyToken from "../middleware/auth";

const upload = multer({ dest: "uploads/" });

router.get('/', verifyToken, genrerController.getGenrer);
router.get('/:id', genrerController.getGenrerById);
router.post('/', upload.single('image'), genrerController.createGenrer);
router.put('/:id', genrerController.updateGenrer);
router.put('/image/:id', genrerController.updateImage);
router.delete('/:id', genrerController.deleteGenrer);

export default router;