import { Types, ObjectId, Document } from "mongoose";
import { albumsModel } from "../models/albums.model";
import cloudinary from "../config/cloudinary.config";
import User from "../models/users.model";
import soundtrack from "../models/tracks.model";

type searchParameters = {
  title?: String;
  username?: String;
};
type albumModel = {
  title?: String;
  genre?: String;
  username?: ObjectId;
  image?: String;
  songs?: ObjectId[];
  uploadDate?: Date;
};

interface Owner {
  _id: ObjectId;
  username: string;
}

interface Song {
  _id: ObjectId;
  title: string;
  url: string;
}

interface Album extends Document {
  _id: ObjectId;
  title: string;
  owner: Owner;
  songs: Song[];
}

export const findAlbums = async (data: searchParameters) => {
  if (!data.title && !data.username) {
    const result = await albumsModel
    .find()
    .populate("songs");
  return result;
  }
  if (!data.username) {
    const result = await albumsModel
      .find({ title: data.title })
      .populate("songs");
    return result;
  }
  const user = await User.findOne({ username: data.username });
  if (!data.title) {
    const result = await albumsModel
      .find({ owner: user?._id })
      .populate("songs");
    return result;
  }
  const result = await albumsModel
    .find({ title: data.title, owner: user?._id })
    .populate("songs");
  return result;
};

export const findOneAlbum = async (albumId: string): Promise<any> => {
  const album = await albumsModel.findById(albumId)
    .populate("songs")
    .populate("owner")
    .exec();

  if (!album) {
    return null;
  }
  const populatedAlbum = album.toObject() as Album;
  const response = {
    title: populatedAlbum.title,
    username: (populatedAlbum.owner as Owner).username,
    songs: (populatedAlbum.songs as Song[]).map((song) => ({
      songTitle: song.title,
      songUrl: song.url
    }))
  }
  return response;
};

export const createAlbum = async (
  title: String,
  genre: String,
  username: String,
  image?: any,
  songs?: Types.ObjectId[]
) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return 1;
  }
  const exists = await albumsModel.findOne({ title: title, owner: user?._id });
  if (exists) {
    return 2;
  }
  const imageStore = await cloudinary.uploader.upload(image.path,{
    resource_type: "image",
    folder: `Tracks/${title}/img`
  })

  const validSongs =
    songs && Array.isArray(songs)
      ? songs.map((song) => new Types.ObjectId(song))
      : [];

  const newAlbum = await albumsModel.create({
    title: title,
    genre: genre,
    owner: user?._id,
    songs: validSongs,
    image: imageStore.secure_url || "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?w=300&ssl=1"
  });
  return newAlbum;
};

export const updateOneAlbum = async (id: String, data: albumModel) => {
  const { title, genre, image, songs, username } = data;
  const user = await User.findOne({ username: username });
  if (!user) {
    return 0;
  } else {
    const album = await albumsModel
    .findOneAndUpdate(
      { _id: id, owner: user._id },
      {
        $push: {
          songs: songs,
        },
        $set: {
          title,
          genre,
          image,
          uploadDate: Date.now(),
          },
        },
        { new: true }
      )
      .populate("songs");
      if (!album) {
      return 0;
    } else {      
        return album;
    }
  }
};

export const deleteFullAlbum = async (title: String, username: String) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return 0;
  } else {
    const album = await albumsModel.findOne({title: title, owner: user._id})
    const deletingAlbum = await albumsModel.deleteOne({
      title: title,
      owner: user._id,
      });
      if (!deletingAlbum) {
        return 0;
        } else {
      await soundtrack.deleteMany({ _id: { $in: album?.songs } });
      return 1;
    }
  }
};
