export interface TrendData {
  id: number;
  genre: string;
  title: string;
  author: string;
  image: string;
  songs: {};
}

export interface ImageMap {
  [key: string]: string;
}
