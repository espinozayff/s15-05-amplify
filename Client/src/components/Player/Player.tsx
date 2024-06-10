import { useEffect, useRef, useState, JSX, useCallback } from "react";
import { Controls, ProgressBar, Tracks } from "./index";
import { useWavesurfer } from "@wavesurfer/react";
import usePlayerStore from "../../store/playerStore";

function Player(): JSX.Element | null {
  const { tracks, currentIndex, setIndex } = usePlayerStore();
  const [isTrackLoading, setIsTrackLoading] = useState<boolean>(false);
  const currentTrack = tracks[currentIndex] || null;
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
    setIndex(index);
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
    setIndex((currentIndex - 1 + tracks.length) % tracks.length);
  }, [currentIndex, setIndex, tracks.length]);

  const onNextSong = useCallback(() => {
    userInteracted.current = true;
    setIndex((currentIndex + 1) % tracks.length);
  }, [currentIndex, setIndex, tracks.length]);

  const onScrub = (value: number): void => {
    if (ws) {
      ws?.seekTo(value / ws.getDuration());
    }
  };

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
  }, [currentTrack, isPlaying, ws, isTrackLoading, currentIndex]);

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
    <div className="fixed bottom-0 inset-x-0 z-30 bg-black/60 backdrop-blur-sm block text-white w-full mx-auto accent-yellow-400">
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
          isReady={isReady}
          duration={ws?.getDuration() || 0}
          currentProgress={currentTime || 0}
          onChange={(e) => onScrub(+e.target.value)}
          album={currentTrack.album}
        >
          <div ref={wsContainer} className="w-full cursor-pointer max-md:hidden"></div>
        </ProgressBar>

        <Tracks tracks={tracks} handler={changeSong} />
      </div>
    </div>
  );
}

export default Player;