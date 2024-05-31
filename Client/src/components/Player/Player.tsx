import { useEffect, useRef, useState, JSX, useCallback } from "react";
import { ITrack } from "./Player.types";
import { Controls, ProgressBar, Tracks } from "./index";
import { useWavesurfer } from "@wavesurfer/react";

const defaultValues = [
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

function Player({ tracks = defaultValues }: { tracks?: ITrack[] }): JSX.Element | null {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isTrackLoading, setIsTrackLoading] = useState<boolean>(false);
  const currentTrack = tracks[trackIndex] || null;
  const wsContainer = useRef(null);
  const userInteracted = useRef<boolean>(false);
  const {
    wavesurfer: ws,
    isReady,
    isPlaying,
    currentTime,
  } = useWavesurfer({
    container: wsContainer,
    waveColor: "#ddd",
    progressColor: "#ffcc00",
    cursorColor: "transparent",
    barWidth: 2,
    barRadius: 1,
    height: 40,
    width: "100%",
    normalize: true,
    barAlign: "bottom",
    dragToSeek: true,
    url: currentTrack.url,
  });

  const changeSong = (index: number): void => {
    setTrackIndex(index);
  };

  const onPlay = async (): Promise<void> => {
    userInteracted.current = true;
    if (!isTrackLoading && ws) {
      try {
        await ws.playPause();
      } catch (error) {
        //console.error("Error playing the track:", error);
      }
    }
  };

  const onPrevSong = useCallback(() => {
    userInteracted.current = true;
    setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  }, [tracks]);

  const onNextSong = useCallback(() => {
    userInteracted.current = true;
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  }, [tracks]);

  useEffect(() => {
    if (ws && userInteracted.current) {
      //console.log("Loading new track:", currentTrack.url);
      setIsTrackLoading(true);
      ws.once("ready", async () => {
        //console.log("Track is ready:", currentTrack.url);
        setIsTrackLoading(false);
        try {
          await ws.play();
        } catch (error) {
          //console.error("Error playing the track:", error);
        }
      });
      ws.load(currentTrack.url);
    }
  }, [currentTrack.url, ws]);

  useEffect(() => {
    if (userInteracted.current && isPlaying && !isTrackLoading) {
      (async () => {
        try {
          await ws?.play();
        } catch (error) {
          //console.error("Error playing the track:", error);
        }
      })();
    }

    if ("mediaSession" in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [{ src: currentTrack?.cover, sizes: "256x256", type: "image/png" }],
      });
    }
  }, [currentTrack, isPlaying, ws, isTrackLoading]);

  useEffect(() => {
    if (ws) {
      ws.on("finish", onNextSong);
      ws.on("seeking", async () => {
        try {
          await ws.play();
        } catch (error) {
          //console.error("Error seeking the track:", error);
        }
      });
    }

    return () => {
      if (ws) {
        ws.un("finish", onNextSong);
      }
    };
  }, [ws, onNextSong]);

  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 slide inset-x-0 z-30 bg-black/60 backdrop-blur-sm block text-white w-full mx-auto accent-yellow-400">
      <div className="flex justify-between items-center md:w-[95%] mx-auto max-md:flex-wrap max-md:pb-2.5">
        <Controls
          isReady={isReady}
          onPrev={onPrevSong}
          onNext={onNextSong}
          onPlay={onPlay}
          isPlaying={isPlaying}
          track={currentTrack}
        />

        <ProgressBar
          duration={ws?.getDuration() || 0}
          currentProgress={currentTime || 0}
          album={currentTrack.album}
        >
          <div ref={wsContainer} className="w-full cursor-pointer"></div>
        </ProgressBar>

        <Tracks tracks={tracks} handler={changeSong} />
      </div>
    </div>
  );
}

export default Player;
