import { Dispatch, SetStateAction } from "react";

export type setStateType<T> = Dispatch<SetStateAction<T>>;

export interface ITrack {
  title: string;
  artist: string;
  cover: string;
  album: string;
  url: string;
}
