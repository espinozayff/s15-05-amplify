import React, { Fragment } from "react";
import tracksData from "../../../data/amplifyDataBack.json";
import { Link } from "react-router-dom";
import { Song, Track, Props } from "./FilterList.types";

const FilterList: React.FC<Props> = ({ searchText }) => {
  console.log("Search text:", searchText);

  const { tracks } = tracksData; // Obtener la lista de tracks del JSON

  // Función para filtrar canciones según el texto de búsqueda y agregar track_id
  const filteredSongs = tracks.reduce((acc: { song: Song; track: Track }[], track: Track) => {
    const filteredTrackSongs = track.songs
      .filter((song: Song) => song.title.toLowerCase().includes(searchText.toLowerCase()))
      .map((song: Song) => ({ song, track }));
    return [...acc, ...filteredTrackSongs];
  }, []);

  return (
    <div
      className="absolute top-full left-0 mt-3 bg-black/90 w-full p-0 h-52 overflow-auto
     rounded-md shadow-sm"
    >
      <ul className="flex flex-col">
        {filteredSongs.length === 0 ? (
          <li className="text-gray-500 text-center p-3">No se han encontrado resultados.</li>
        ) : (
          <Fragment>
            <h3 className="font-semibold text-gray-500 text-sm mb-3 px-3 pt-2 pb-1">Sugeridos</h3>
            {filteredSongs.map(({ song, track }) => (
              <li key={song.title} className="hover:bg-slate-800 px-3">
                <Link
                  to={`/album/${track.track_id}`}
                  state={{
                    id: track.track_id,
                    genre: song.gender,
                    title: track.title,
                    author: track.author,
                    image: track.cover_image,
                    songs: track.songs,
                  }}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center flex-col">
                    <h3 className="w-full text-white">{song.title}</h3>
                    <p className="w-full text-white">
                      <span className="text-[#9D174D] font-bold text-sm">Género: </span>
                      <span className="text-sm text-gray-500 font-semibold capitalize">
                        {song.gender}
                      </span>
                    </p>
                  </div>
                  <img
                    src={song.cover_image}
                    alt={song.title}
                    className="w-8 h-8 bg-cover rounded-sm"
                  />
                </Link>
              </li>
            ))}
          </Fragment>
        )}
      </ul>
    </div>
  );
};

export default FilterList;
