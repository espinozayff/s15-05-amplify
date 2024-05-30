import { ObjectId } from 'mongoose'
import { albumsModel } from "../models/albums.model";
import { usersModel } from "../models/users.model"
import { songsModel } from "../models/songs.model"

type searchParameters = {
    title?: String,
    username?: String
}
type albumModel = {
    title?: String
    genre?: String
    username?: ObjectId
    songs?: ObjectId[]
    uploadDate?: Date
}

export const findAlbum = async (data:searchParameters) => {
    if(data.title && data.username){
        const user = await usersModel.findOne({username: data.username})
        if(!user){
            const result = await albumsModel.find({title: data.title})
            return result
        } else {
            const result = await albumsModel.find({title: data.title, owner: user._id}).populate('music')
        return result
        }        
    } else if(!data.username){
        const result = await albumsModel.find({title: data.title})
        return result
    } else if(!data.title){
        const user = await usersModel.find({username: data.username})
        if(!user){
            return undefined
        } else {
            const result = await albumsModel.find({owner: user._id})
        return result
        }        
    }
}

export const createAlbum = async (title: String, genre: String, username: String, songs: ObjectId[]) => {
    const user = await usersModel.findOne({username: username})
    const newAlbum = await albumsModel.create({title: title, genre: genre, owner: user._id, songs: songs})
    return newAlbum    
}

export const updateOneAlbum = async (data: albumModel) => {
    const {title, genre, songs} = data
    const user = await usersModel.findOne({username: data.username})
    if(!user){
        return 0
    } else {
        const album = await albumsModel.findOneAndUpdate(
            {owner: user._id, title: data.title, uploadDate: data.uploadDate}, 
            {$set: title, genre, songs}, 
            { new: true }
        )
        if(!album){
            return 0
        } else {
            return album
        }
    }
} 

export const deleteFullAlbum = async (title: String, username: String) => {
    const user = await usersModel.findOne({username: username})
    if(!user){
        return 0
    } else {
        const album = await albumsModel.findOne({title: title, owner: user._id})
        if(!album){
            return 0
        } else {
            await songsModel.deleteMany({ _id: { $in: album.songs } });
            const deletingAlbum = await albumsModel.deleteOne({title: title, owner: user._id})
            if(!deletingAlbum){
                return 0
            } else {
                return 1
            }
        }
    }
}
