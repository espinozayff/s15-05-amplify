import genrerModel from "../models/genrer.model";
import { genreInterface } from "../intarfaces/genrer.interface";
import cloudinary from "../config/cloudinary.config";

class genreService {
  async getGenrer(query: any): Promise<any[]> {
    try {
      const genrer = await genrerModel.find(query).populate('soundTracks');
      if (!genrer) throw new Error("Generos no encontrados");
      const sortedGenrer = genrer.sort(
        (a, b) => b.soundTracks.length - a.soundTracks.length
      );
      return sortedGenrer;
    } catch (error) {
      throw new Error(
        `Error al obtener los generos: ${(error as Error).message}`
      );
    }
  }

  async getGenrerById(id: any): Promise<any> {
    try {
      const genrer = await genrerModel.findById(id).populate('soundTracks');
      if (!genrer) throw new Error("Genero no encontrado");
      return genrer;
    } catch (error) {
      throw new Error(
        `Error al obtener el genero: ${(error as Error).message}`
      );
    }
  }

  async createGenrer(data: genreInterface, imageFile:any): Promise<any> {
    try {

      const imageStore = await cloudinary.uploader.upload(imageFile.path,{
        resource_type: "image",
      })

      const genrer = new genrerModel({
        name: data,
        image: imageStore.secure_url,
      });
      
      await genrer.save();
      return { msg: "Genero creada exitosamente" };
    } catch (error) {
      throw new Error(`Error al crear el genero: ${(error as Error).message}`);
    }
  }

  async updateGenrer(id: any, data: any): Promise<any> {
    try {
      const genrer = await genrerModel.findById(id);
      if (!genrer) {
        throw new Error("Género no encontrado");
      }
      const soundTrackExists = genrer.soundTracks.includes(data);

      if (soundTrackExists) {
        throw new Error("La canción ya está presente en el array soundTracks");
      }
      genrer.soundTracks.push(data);
      await genrer.save();
      return { msg: "Genero actualizado exitosamente" };
    } catch (error) {
      throw new Error(`Error al actualizar el genero: ${(error as Error).message}`);
    }
  }

  async updateImage(id:any, imageFile:any): Promise<any>{
    try {
      const imageStore = await cloudinary.uploader.upload(imageFile.path,{
        resource_type: "image",
      })
      const genrer = await genrerModel.findById(id);
      if (!genrer) {
        throw new Error("Género no encontrado");
      }
      genrer.image = imageStore.secure_url;
      await genrer.save();
      return { msg: "Genero actualizado exitosamente" };
    } catch (error) {
      throw new Error(`Error al actualizar el genero: ${(error as Error).message}`);
    }
  }

  async deleteGenrer(id: any): Promise<any> {
    try {
      const genrer = await genrerModel.findById(id);
      if (!genrer) {
        throw new Error("Género no encontrado");
      }
      const deleteGenrer = await genrerModel.findByIdAndDelete(id);   
      return { msg: "Genero eliminado exitosamente" };
    } catch (error) {
      throw new Error(`Error al eliminar el genero: ${(error as Error).message}`);
    }
  }
}

export default new genreService();
