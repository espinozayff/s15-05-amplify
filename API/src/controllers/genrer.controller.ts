import genrerServices from "../services/genrer.services";
import { httpResponse } from "../utils/EnumsError";
import { Request, Response } from "express";
import {CustomRequest} from "../middleware/auth"

const HttpResponse = new httpResponse();

class genrerController {
  async getGenrer(req: CustomRequest, res: Response) {
    try {
      const { query = {} } = req;
      const genrer = await genrerServices.getGenrer(query);
      if (!genrer) return HttpResponse.NotFound(res, "No existe ningun dato");
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async getGenrerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genrer = await genrerServices.getGenrerById(id);
      if (!genrer) return HttpResponse.NotFound(res, "No existe el genero");
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async createGenrer(req: Request, res: Response) {
    try {
      const image = req.file;
      const { name } = req.body;
      const genrer = await genrerServices.createGenrer(name, image);
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async updateGenrer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { soundTrackId } = req.body;
      const genrer = await genrerServices.updateGenrer(id, soundTrackId);
      if (!genrer) return HttpResponse.NotFound(res, "No existe el genero");
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async updateImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const image = req.file;
      const genrer = await genrerServices.updateImage(id, image);
      if (!genrer) return HttpResponse.NotFound(res, "No existe el genero");
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }

  async deleteGenrer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genrer = await genrerServices.deleteGenrer(id);
      if (!genrer) return HttpResponse.NotFound(res, "No existe el genero");
      return HttpResponse.OK(res, genrer);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  }
}
export default new genrerController();
