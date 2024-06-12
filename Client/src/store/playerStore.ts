
import { create } from "zustand";
import { ITrack } from "../components/Player/Player.types";
import tracksData from '../data/amplifyDataBack.json';  // Importar el JSON

// Transformar las pistas del JSON a la estructura ITrack
const transformedTracks = tracksData.tracks.flatMap(track => 
  track.songs.map(song => ({
    title: song.title,
    artist: track.author,
    album: track.title,
    cover: song.cover_image,
    url: song.file,
  }))
);

interface IPlayerStore {
  tracks: ITrack[];
  currentIndex: number;
  setTracks: (newTracks: ITrack[]) => void;
  setIndex: (newIndex: number) => void;
  currentAlbumIndex: number; // Nuevo estado para almacenar el índice del álbum actual
  setCurrentAlbumIndex: (index: number) => void; // Función para actualizar el índice del álbum actual
}

const usePlayerStore = create<IPlayerStore>((set) => ({
  tracks: transformedTracks,
  currentIndex: 0,
  setTracks: (newTracks: ITrack[]) => set({ tracks: newTracks }),
  setIndex: (newIndex: number) => set({ currentIndex: newIndex }),
  currentAlbumIndex: 0, // Inicialmente, se establece en 0 o el índice del álbum por defecto
  setCurrentAlbumIndex: (index: number) => set({ currentAlbumIndex: index }), // Función para actualizar el índice del álbum actual
}));

export default usePlayerStore;
