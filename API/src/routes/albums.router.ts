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

albumsRouter.get('/', getAlbums)

albumsRouter.get('/:id', getAlbumById)

albumsRouter.post('/', upload.single('image'), newAlbum)

albumsRouter.put('/:id', updateAlbum)

albumsRouter.delete('/', deleteAlbum)

export default albumsRouter
