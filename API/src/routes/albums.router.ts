import { Router } from "express"
import multer from "multer";
import {
    getAlbums,
    getAlbumById,
    newAlbum,
    updateAlbum,
    deleteAlbum
} from "../controllers/albums.controller"

const upload = multer({ dest: "uploads/" });

const albumsRouter = Router()

/**
 * @swagger
 * tags:
 *   name: Album
 *   description: Endpoints relacionados con álbumes
 */

/**
 * @swagger
 * /api/v1/albums:
 *   get:
 *     summary: Obtener todos los álbumes
 *     description: Obtiene una lista de todos los álbumes.
 *     tags: [Album]
 *     responses:
 *       200:
 *         description: Lista de álbumes recuperada con éxito.
 */
albumsRouter.get('/', getAlbums);


/**
 * @swagger
 * /api/v1/albums/{id}:
 *   get:
 *     summary: Obtener un álbum por ID
 *     description: Obtiene un álbum específico mediante su ID.
 *     tags: [Album]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del álbum a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Álbum recuperado con éxito.
 *       404:
 *         description: Álbum no encontrado.
 */
albumsRouter.get('/:id', getAlbumById);

/**
 * @swagger
 * /api/v1/albums:
 *   post:
 *     summary: Crear un nuevo álbum
 *     description: Crea un nuevo álbum.
 *     tags: [Album]
 *     responses:
 *       201:
 *         description: Álbum creado con éxito.
 */
albumsRouter.post('/', upload.single('image'), newAlbum)

/**
 * @swagger
 * /api/v1/albums/{id}:
 *   put:
 *     summary: Actualizar un álbum existente
 *     description: Actualiza un álbum existente utilizando su ID.
 *     tags: [Album]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del álbum a actualizar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Álbum actualizado con éxito.
 *       404:
 *         description: Álbum no encontrado.
 */
albumsRouter.put('/:id', updateAlbum);

/**
 * @swagger
 * /api/v1/albums:
 *   delete:
 *     summary: Eliminar todos los álbumes
 *     description: Elimina todos los álbumes.
 *     tags: [Album]
 *     responses:
 *       204:
 *         description: Álbumes eliminados con éxito.
 */
albumsRouter.delete('/', deleteAlbum);

export default albumsRouter;
