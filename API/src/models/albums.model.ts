import { Schema, model, SchemaTypes, ObjectId } from "mongoose";

export interface IAlbum {
    title: String
    genre: String
    owner: ObjectId
    songs: ObjectId[]
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
        ref: 'music'
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
})

export const albumsModel = model <IAlbum> ('albums', albumSchema);