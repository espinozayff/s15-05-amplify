import { useEffect, useRef, useState, JSX } from "react";
import { ITrack } from "./Player.types";
import { Controls, ProgressBar, Tracks } from "./index";

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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const currentTrack = tracks[trackIndex] || null;
  const audioRef = useRef<HTMLAudioElement>(null);
  const isReady = useRef<boolean>(false);
  const userInteracted = useRef<boolean>(false);

  function canPlay(): void {
    if (userInteracted.current && isPlaying) {
      audioRef.current?.play();
    }
  }

  useEffect(() => {
    canPlay();

    if ("mediaSession" in navigator && currentTrack?.cover) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [{ src: currentTrack?.cover, sizes: "256x256", type: "image/png" }],
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, isPlaying]);

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onPlay = (): void => {
    userInteracted.current = true;
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const onNextSong = (): void => {
    userInteracted.current = true;
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const onPrevSong = (): void => {
    userInteracted.current = true;
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const onScrub = (value: number): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(audioRef.current.currentTime);
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const onScrubEnd = (): void => {
    if (!isPlaying) {
      setIsPlaying(true);
      onPlay();
    }
  };

  const changeSong = (index: number): void => {
    setTrackIndex(index);
  };

  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 slide inset-x-0 z-30 bg-black/60 backdrop-blur-sm block text-white w-full max-w-screen-2xl mx-auto accent-yellow-400">
      <audio
        className="hidden"
        ref={audioRef}
        src={currentTrack.url}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNextSong}
      />
      <div className="flex justify-between items-center md:w-11/12 mx-auto max-md:flex-wrap max-md:pb-2.5">
        <Controls
          isReady={isReady ? true : false}
          onPrev={onPrevSong}
          onNext={onNextSong}
          onPlay={onPlay}
          isPlaying={isPlaying}
          track={currentTrack}
        />

        <ProgressBar
          duration={duration}
          currentProgress={currentTime}
          onChange={(e) => onScrub(+e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          album={currentTrack.album}
        />

        <Tracks tracks={tracks} handler={changeSong} />
      </div>
    </div>
  );
}

export default Player;
