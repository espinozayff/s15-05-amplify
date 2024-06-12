export interface Song {
  song_id: number;
  title: string;
  gender: string;
  cover_image: string;
  file: string;
}

export interface Track {
  track_id: number;
  title: string;
  author: string;
  cover_image: string;
  songs: Song[];
}

export interface Props {
  searchText: string;
}
