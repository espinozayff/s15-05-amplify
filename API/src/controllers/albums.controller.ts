import { Request, Response, NextFunction } from "express";
import { findAlbums, findOneAlbum, createAlbum, updateOneAlbum, deleteFullAlbum } from "../services/albums.services"
import { httpResponse } from "../utils/EnumsError";

const responseHandler = new httpResponse();

export const getAlbums = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchAlbum = await findAlbums(req.body)
        if(searchAlbum?.length === 0 || !searchAlbum ){
            return responseHandler.NotFound(res, 'Not found');
        } else {
            return responseHandler.OK(res, { message: 'Successful search', payload: searchAlbum });
        }         
    } catch (error) {
        next(error); 
    }
}

export const getAlbumById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const searchAlbum = await findOneAlbum(id)
        if(!searchAlbum){
            return responseHandler.NotFound(res, 'Not found');
        } else {
            return responseHandler.OK(res, { message: 'Successful search', payload: searchAlbum });
        }
    } catch (error) {
        next(error); 
    }
}

export const newAlbum = async (req: Request, res: Response, next: NextFunction) => {
    const {title, genre, username, songs} = req.body
    const image = req.file
    try {
        if(!title || !genre || !username){
            return responseHandler.BAD_REQUEST_ERROR(res, 'Not all required fields provided')
        }
        const createdAlbum = await createAlbum(title, genre, username, image, songs)
        if(createdAlbum === 1){
            return responseHandler.UNAUTHORIZED(res, 'No user found')
        }
        if(createdAlbum === 2){
            return responseHandler.BAD_REQUEST_ERROR(res, 'Album almost exists');
        } else {
            return responseHandler.OK(res, { message: 'Album created successfuly', payload: createdAlbum });
        }
    } catch (error) {
        next(error); 
    }
}

export const updateAlbum = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const update = await updateOneAlbum(id, req.body)
    try {
        if(update){
            return responseHandler.OK(res, { message: 'Album updated', payload: update });
        } else {
            return responseHandler.BAD_REQUEST_ERROR(res, 'Couldn´t update album');
        }
    } catch (error) {
        next(error); 
    }
    
}

export const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
    const {title, username} = req.body
    try {
        const deleteAlbum = await deleteFullAlbum(title, username)
        if(!deleteAlbum){
            return responseHandler.BAD_REQUEST_ERROR(res, 'Couldnt delete album');
        } else {
            return responseHandler.OK(res, 'Successful deletion');
        }
    } catch (error) {
        next(error); 
    }
}