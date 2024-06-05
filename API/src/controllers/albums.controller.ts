import { Request, Response } from "express";
import { findAlbums, findOneAlbum, createAlbum, updateOneAlbum, deleteFullAlbum } from "../services/albums.services"
import { httpResponse } from "../utils/EnumsError";

export const getAlbums = async (req: Request, res: Response): Promise<void> => {
    try {
        if(!req.body.title && !req.body.username){
            res.status(400).json({message: 'No parameters for search'})
        } else {
            const searchAlbum = await findAlbums(req.body)
            if(searchAlbum?.length === 0 || !searchAlbum ){
                res.status(400).json({message: 'not founds'})
            } else {
                res.status(200).json({message: 'Successful search', payload: searchAlbum})
            }
        }
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const getAlbumById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params
    try {
        const searchAlbum = await findOneAlbum(id)
        if(!searchAlbum){
            res.status(400).json({message: 'not'})
        } else {
            res.status(200).json({message: 'Successful search', payload: searchAlbum})
        }
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const newAlbum = async (req: Request, res: Response): Promise<void> => {
    const {title, genre, username, image, songs} = req.body
    try {
        const createdAlbum = await createAlbum(title, genre, username, image, songs)
        if(!createdAlbum){
            res.status(400).json({message: 'Error creating Album'})
        } else {
            res.status(200).json({message: 'Album created successfuly', payload: createdAlbum})
        }
    } catch (error) {
        res.status(500).json('Server error')
    }
}

export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const update = await updateOneAlbum(id, req.body)
    try {
        if(update){
            res.status(200).json({message: "Album updated"})
        } else {
            res.status(400).json({message: "Couldnt update album"})
        }
    } catch (error) {
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