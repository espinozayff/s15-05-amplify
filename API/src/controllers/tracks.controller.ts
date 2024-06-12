import { Request, Response } from "express";

import trackService from "../services/tracks.services";
import { httpResponse } from "../utils/EnumsError";
import { CustomRequest } from "../middleware/auth"; 

const HttpResponse = new httpResponse();

class tracksController {
  async getAllTracks(req: Request, res: Response) {
    try {
      const { query = {} } = req;
      const tracks = await trackService.getTracks(query);
      if (!tracks) return HttpResponse.NotFound(res, "No existe ningun dato");
      return HttpResponse.OK(res, tracks);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async getTrackById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const track = await trackService.getTrackById(id);
      if (!track) return HttpResponse.NotFound(res, "No existe ningun dato");
      return HttpResponse.OK(res, track);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async createTrack(req: CustomRequest, res: Response) {
    try {
      const user = req.user!.id
      const { title, genrer, album } = req.body;

      
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const parsedGenrer = JSON.parse(genrer);

      if (!files.songData || !files.image) {
        return HttpResponse.NotFound(
          res,
          "La canción y la imagen son obligatorias"
        );
      }
      
      const songFile = files.songData[0];
      const imageFile = files.image[0];
      const body = { title, genrer:parsedGenrer, album, user };
      const savedTrack = await trackService.createTrack(
        songFile,
        body,
        imageFile
      );
      return HttpResponse.OK(res, savedTrack);
    } catch (error) {
      console.log(error);

      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async updateTrack(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const track = await trackService.updateTrack(id, data);
      return HttpResponse.OK(res, track);
    } catch (error) {
      console.log(error);
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async daleteTrack(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const track = await trackService.deleteTrack(id);
      return HttpResponse.OK(res, track);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }
}
export default new tracksController();

