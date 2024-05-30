import { Router } from "express"
import {
    getAlbum,
    newAlbum,
    deleteAlbum
} from "../controllers/albums.controller"

const router = Router()

router.get('/', getAlbum)

router.post('/newAlbum', newAlbum)

router.delete('/deleteAlbum', deleteAlbum)

export default router
