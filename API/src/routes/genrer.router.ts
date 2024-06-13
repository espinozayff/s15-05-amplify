import { Router } from "express";
import multer from "multer";
import genrerController from "../controllers/genrer.controller";
import { verifyToken } from "../middleware/auth";

const router = Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * tags:
 *   name: Genre
 *   description: Endpoints relacionados con géneros musicales
 */

router.get('/', genrerController.getGenrer);

/**
 * @swagger
 * /api/v1/genre/{id}:
 *   get:
 *     summary: Obtener un género por ID
 *     description: Obtiene un género específico mediante su ID.
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género recuperado con éxito.
 *       404:
 *         description: Género no encontrado.
 */

router.get('/',  genrerController.getGenrer);

router.get('/:id', genrerController.getGenrerById);

/**
 * @swagger
 * /api/v1/genre:
 *   post:
 *     summary: Crear un nuevo género
 *     description: Crea un nuevo género.
 *     tags: [Genre]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Imagen del género.
 *       - in: formData
 *         name: nombre
 *         type: string
 *         description: Nombre del género.
 *     responses:
 *       201:
 *         description: Género creado con éxito.
 */
router.post('/', upload.single('image'), genrerController.createGenrer);

/**
 * @swagger
 * /api/v1/genre/{id}:
 *   put:
 *     summary: Actualizar un género existente
 *     description: Actualiza un género existente utilizando su ID.
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género a actualizar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género actualizado con éxito.
 *       404:
 *         description: Género no encontrado.
 */
router.put('/:id', genrerController.updateGenrer);

/**
 * @swagger
 * /api/v1/genre/image/{id}:
 *   put:
 *     summary: Actualizar la imagen de un género existente
 *     description: Actualiza la imagen de un género existente utilizando su ID.
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género cuya imagen se actualizará.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Imagen de género actualizada con éxito.
 *       404:
 *         description: Género no encontrado.
 */
router.put('/image/:id', upload.single('image'), genrerController.updateImage);

/**
 * @swagger
 * /api/v1/genre/{id}:
 *   delete:
 *     summary: Eliminar un género
 *     description: Elimina un género utilizando su ID.
 *     tags: [Genre]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Género eliminado con éxito.
 */
router.delete('/:id', genrerController.deleteGenrer);

export default router;
