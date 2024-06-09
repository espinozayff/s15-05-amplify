import Soundtrack from "../models/tracks.model";
import { UploadFile, TrackBody } from "../types";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../utils/constant";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const getAllTracks = async () => {
    try {
        const tracks = await Soundtrack.find({});
        return tracks;
    } catch (err) {
        console.log(err);
    }
};

export const createTrack = async (file:UploadFile, body:TrackBody) => {
    try {
        const { title, genre } = body;
        const response = await cloudinary.uploader.upload(file.path, {
            resource_type: "video", // Specify resource type as video for audio files
        });

        const newTrack = new Soundtrack({
            title,
            genre,
            user: "6655f0c83da05af9e41fa415",
            url: response.secure_url,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lockheed_SR-71_Blackbird.jpg/765px-Lockheed_SR-71_Blackbird.jpg"
        });

        const savedTrack = await newTrack.save();
        return savedTrack;
    } catch (err) {
        console.log(err);
    }
};

export const getTrackLikes = async (tid: string) => {
    try {
        const track = await Soundtrack.findById(tid).populate('likes');
        if (!track) {
            throw new Error("Track not found");
        }
        return track.likes.length;
    } catch (err) {
        throw err;
    }
};
