import { Request, Response } from "express";
import { getAllTracks, createTrack } from "../services/tracks";
import { TrackBody, UploadFile } from "../types";

export const getTracks = async (req: Request, res: Response) => {
    try {
        const tracks = await getAllTracks();

        if (!tracks || tracks.length === 0) {
            console.log("No tracks found in the database.");
            return res.status(404).json({ message: "No tracks found." });
        }

        return res.status(200).json({ Tracks: tracks });
    } catch (err) {
        res.status(500).send({ error: err });
        console.log(err);
    }
};

export const postTrack = async (req: Request, res: Response) => {
    const { file } = req;
    const { title, genre, likes } = req.body;

    if (!file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    try {
        const savedTrack = await createTrack(file, req.body);

        res.status(201).json({
            message: "Track created!",
            savedTrack
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
};