import { Router } from "express"
import {
    getAlbum,
    newAlbum,
    deleteAlbum
} from "../controllers/albums.controller"

const albumsRouter = Router()

albumsRouter.get('/', getAlbum)

albumsRouter.post('/', newAlbum)

albumsRouter.delete('/', deleteAlbum)

export default albumsRouter
