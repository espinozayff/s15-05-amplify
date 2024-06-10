import { Types, ObjectId } from "mongoose";
import { albumsModel } from "../models/albums.model";
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

export const findAlbums = async (data: searchParameters) => {
  if (!data.title && !data.username) {
    return null;
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

export const findOneAlbum = async (albumId: String) => {
  const album = await albumsModel.findById(albumId).populate("songs");
  if (!album) {
    return null;
  } else {
    return album;
  }
};

export const createAlbum = async (
  title: String,
  genre: String,
  username: String,
  songs?: Types.ObjectId[],
  image?: String
) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return 1;
  }
  const exists = await albumsModel.findOne({ title: title, owner: user?._id });
  if (exists) {
    return 2;
  }
  const validSongs =
    songs && Array.isArray(songs)
      ? songs.map((song) => new Types.ObjectId(song))
      : [];
  const newAlbum = await albumsModel.create({
    title: title,
    genre: genre,
    owner: user?._id,
    songs: validSongs,
    image:
      image ||
      "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?w=300&ssl=1",
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
          $set: {
            title,
            genre,
            image,
            songs,
            uploadDate: Date.now(),
          },
        },
        { new: true }
      )
      .populate("songs");
    if (!album) {
      return 0;
    } else {
      const album = await albumsModel.findOneAndUpdate(
        { owner: user._id, title: data.title, uploadDate: data.uploadDate },
        { $set: title, genre, songs },
        { new: true }
      );
      if (!album) {
        return 0;
      } else {
        return album;
      }
    }
  }
};

export const deleteFullAlbum = async (title: String, username: String) => {
  const user = await User.findOne({ username: username });
  if (!user) {
    return 0;
  } else {
    //await soundtrack.deleteMany({ _id: { $in: album.songs } });
    const deletingAlbum = await albumsModel.deleteOne({
      title: title,
      owner: user._id,
    });
    if (!deletingAlbum) {
      return 0;
    } else {
      return 1;
    }
  }
};
