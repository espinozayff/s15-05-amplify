import { Schema, model, SchemaTypes, ObjectId } from "mongoose";
import validator from 'validator';

export interface IAlbum {
    title: String
    genre: String
    owner: ObjectId
    songs: ObjectId[]
    image?: String
    uploadDate: Date
}

const albumSchema = new Schema <IAlbum>({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    owner: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'users'
    },
    songs: {
        type: [SchemaTypes.ObjectId],
        required: true,
        ref: 'Soundtrack'
    },
    image:{
        type: String,
        required: true,
        validate: {
            validator: (value:string) => validator.isURL(value),
            message: 'Invalid URL'
        }
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})

export const albumsModel = model <IAlbum> ('albums', albumSchema);