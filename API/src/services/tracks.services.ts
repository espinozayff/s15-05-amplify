import Soundtrack from "../models/tracks.model";
import cloudinary from "../config/cloudinary.config";
import { trackInterface, UploadFile } from "../intarfaces/tracks.interface";
import genrerModel from "../models/genrer.model";
import genrerServices from "./genrer.services";

class trackService {
  async getTracks(query: any): Promise<any[]> {
    try {
      const tracks = await Soundtrack.find(query).populate('user').populate('likes').populate('album');
      if (!tracks) throw new Error("Canciones no encontradas");
      return tracks;
    } catch (error) {
      throw new Error(
        `Error al obtener las canciones: ${(error as Error).message}`
      );
    }
  }

  async getTrackById(id: any): Promise<any> {
    try {
      const tracks = await Soundtrack.findById(id).populate('user').populate('likes').populate('album');
      if (!tracks) throw new Error("Cancion no encontradas");
      return tracks;
    } catch (error) {
      throw new Error(
        `Error al obtener la cancion: ${(error as Error).message}`
      );
    }
  }

  async createTrack(songFile: UploadFile, body: trackInterface, imageFile:any): Promise<any> {
    try {
      const { title, genrer, user, album } = body;

      const response = await cloudinary.uploader.upload(songFile.path, {
        resource_type: "video",
        folder: `Tracks/Singles`
      });

      const imageStore = await cloudinary.uploader.upload(imageFile.path,{
        resource_type: "image",
        folder: `Tracks/Singles`
      })

      const genrerUpload = await genrerModel.findById(genrer!.id);
      if (!genrerUpload) throw new Error("Género no encontrado");
      const newTrack = new Soundtrack({
        title,
        genrer,
        user,
        url: response.secure_url,
        image: imageStore.secure_url,
        album
      });
      
      const savedTrack = await newTrack.save();
      const updateGenrer = await genrerServices.updateGenrer(genrer!.id, savedTrack.id);
      return {msg:'Canción creada exitosamente'};
    } catch (error) {
      throw new Error(`Error al crear la canción: ${(error as Error).message}`);
    }
  }

  async updateTrack(id:string, data:any): Promise<any> {
    try {
      if(data.image){
        const image = data.image;
        const imageStore = await cloudinary.uploader.upload(image.path,{
          resource_type: "image",
        })
        data.image = imageStore.secure_url;
      }
      const tracks = await Soundtrack.findById(id);
      if (!tracks) throw new Error("Cancion no encontradas");
      const updTrasck = await Soundtrack.findByIdAndUpdate(id, data, { new: true });
      return {msg: 'Canción actualizada'};
    } catch (error) {
      throw new Error(`Error al actualizar la canción: ${(error as Error).message}`);
    }
  }

  async deleteTrack(id:string):Promise<any>{
    try {
      const tracks = await Soundtrack.findById(id);
      if (!tracks) throw new Error("Cancion no encontradas");
      const delTrack = await Soundtrack.findByIdAndDelete(id);
      return {msg: 'Canción eliminada'};
    } catch (error) {
      throw new Error(`Error al eliminar la canción: ${(error as Error).message}`);
    }
  }
}
export default new trackService();