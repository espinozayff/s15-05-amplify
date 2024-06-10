import { create } from "zustand";
import { ITrack } from "../components/Player/Player.types";

interface IPlayerStore {
  tracks: ITrack[];
  currentIndex: number;
  setTracks: (newTracks: ITrack[]) => void;
  setIndex: (newIndex: number) => void;
}

const defaultValues: ITrack[] = [
  {
    title: "Chords of Life",
    artist: "Madza",
    album: "Album Madza",
    cover:
      "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-4.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
  },
  {
    title: "Late Night Drive",
    artist: "Madza 2",
    album: "Album Madza 2",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg",
    url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
  },
  {
    title: "Persistence",
    artist: "Madza 3",
    album: "Album Madza 3",
    cover: "https://ecx.images-amazon.com/images/I/51vrW3uNCJL._SL500_.jpg",
    url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
  },
];

const usePlayerStore = create<IPlayerStore>((set) => ({
  tracks: defaultValues,
  currentIndex: 0,
  setTracks: (newTracks: ITrack[]) => set({ tracks: newTracks }),
  setIndex: (newIndex: number) => set({ currentIndex: newIndex }),
}));

export default usePlayerStore;
