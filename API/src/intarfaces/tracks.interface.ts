import { ObjectId } from "mongoose";

export interface trackInterface {
    id?: string;
    title: string;
    genrer?: genrer;
    user: string;
    url?: string;
    likes?: Array<any>;
    image?: string;
    releaseDate?: Date;
    album?: ObjectId;
}

export interface UploadFile {
    path: string;
}

interface genrer {
    name: string,
    id: string
}