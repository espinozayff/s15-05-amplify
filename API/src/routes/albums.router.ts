import { Router } from "express"
import {
    getAlbum,
    newAlbum,
    deleteAlbum
} from "../controllers/albums.controller"

const albumsRouter = Router()

albumsRouter.get('/', getAlbum)

albumsRouter.post('/newAlbum', newAlbum)

albumsRouter.delete('/deleteAlbum', deleteAlbum)

export default albumsRouter
