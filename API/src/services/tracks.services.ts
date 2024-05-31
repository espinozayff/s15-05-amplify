
import Soundtrack from "../models/tracks.model";
import { UploadFile, TrackBody } from "../types";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dn2kedpyr",
  api_key: "293499338526751",
  api_secret: "u6MFgWcKVbC9r-N1ntMLKiI6_Ps",
});

export const getAllTracks = async () => {
    try {
        const tracks = await Soundtrack.find({});
        return tracks;
    } catch (err) {
        console.log(err);
    }
};

export const getTrack = async (id:string) => {
    try {
        const track = await Soundtrack.findOne({
            id: id
        });
        return track;
    } catch (err) {
        console.log(err);
    }
};

export const createTrack = async (file:UploadFile, body:TrackBody) => {
    try {
        const { title, genre, likes } = body;
        const response = await cloudinary.uploader.upload(file.path, {
            resource_type: "video", // Specify resource type as video for audio files
        });

        const newTrack = new Soundtrack({
            title,
            genre,
            user: "6655f0c83da05af9e41fa415",
            likes,
            url: response.secure_url,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Lockheed_SR-71_Blackbird.jpg/765px-Lockheed_SR-71_Blackbird.jpg"
        });

        const savedTrack = await newTrack.save();
        return savedTrack;
    } catch (err) {
        console.log(err);
    }
};
