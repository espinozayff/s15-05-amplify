import { Request, Response } from "express";
import { findAlbum, createAlbum, deleteFullAlbum } from "../services/albums.services"

export const getAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
        if(!req.body.title || !req.body.username){
            res.status(400).json({message: 'No parameters for search'})
        } else {
            const searchAlbum = await findAlbum(req.body)
            if(Array.isArray(searchAlbum)){
                res.status(400).json({message: 'not founds'})
            } else {
                res.status(200).json({message: 'Successful search', payload: searchAlbum})
            }
        }
    } catch (error) {
        res.status(500).json('Server error')
    }
}  

export const newAlbum = async (req: Request, res: Response): Promise<void> => {
    const {title, genre, username: owner, songs} = req.body
    try {
        const createdAlbum = await createAlbum(title, genre, owner, songs)
        if(!createdAlbum){
            res.status(400).json({message: 'Error creating Album'})
        }
        res.status(200).json({message: 'Album created successfuly', payload: createdAlbum})
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
    const {title, username} = req.body
    try {
        const deleteAlbum = await deleteFullAlbum(title, username)
        if(!deleteAlbum){
            res.status(400).json({message: 'not deleted'})
        } else {
            res.status(200).json({message: 'Successful deletion'})
        }
    } catch (error) {
        res.status(500).json('Server error')
    }
}