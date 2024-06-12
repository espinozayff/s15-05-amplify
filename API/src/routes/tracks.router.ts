import { Router } from "express";
import multer from "multer";
import tracksController from "../controllers/tracks.controller";
import { trackValidator } from "../middleware/trauck.validator";
import { verifyToken } from "../middleware/auth";

const upload = multer({ dest: "uploads/" });
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Track
 *   description: Endpoints relacionados con pistas de audio
 */

router.get("/", tracksController.getAllTracks);

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   get:
 *     summary: Obtener una pista por ID
 *     description: Obtiene una pista de audio específica mediante su ID.
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pista a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pista recuperada con éxito.
 *       404:
 *         description: Pista no encontrada.
 */
router.get("/:id", tracksController.getTrackById);

/**
 * @swagger
 * /api/v1/tracks:
 *   post:
 *     summary: Crear una nueva pista
 *     description: Crea una nueva pista de audio.
 *     tags: [Track]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: songData
 *         type: file
 *         description: Archivo de audio de la pista.
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Imagen de la pista.
 *     responses:
 *       201:
 *         description: Pista creada con éxito.
 */
router.post("/", verifyToken, trackValidator, upload.fields([{ name: 'songData', maxCount: 1 }, { name: 'image', maxCount: 1 }]), tracksController.createTrack);

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   put:
 *     summary: Actualizar una pista existente
 *     description: Actualiza una pista de audio existente utilizando su ID.
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pista a actualizar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pista actualizada con éxito.
 *       404:
 *         description: Pista no encontrada.
 */
router.put("/:id", verifyToken, upload.single('image'), tracksController.updateTrack);

/**
 * @swagger
 * /api/v1/tracks/{id}:
 *   delete:
 *     summary: Eliminar una pista
 *     description: Elimina una pista de audio utilizando su ID.
 *     tags: [Track]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pista a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pista eliminada con éxito.
 */
router.delete("/:id", verifyToken, tracksController.daleteTrack);

export default router;


