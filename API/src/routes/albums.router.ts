import { Router } from "express"
import {
    getAlbums,
    getAlbumById,
    newAlbum,
    updateAlbum,
    deleteAlbum
} from "../controllers/albums.controller"

const albumsRouter = Router()

albumsRouter.get('/', getAlbums)

albumsRouter.get('/:id', getAlbumById)

albumsRouter.post('/', newAlbum)

albumsRouter.put('/:id', updateAlbum)

albumsRouter.delete('/', deleteAlbum)

export default albumsRouter
