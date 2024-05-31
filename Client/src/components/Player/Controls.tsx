import { JSX, SyntheticEvent } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { ITrack } from "./Player.types";

function Controls({
  onPrev,
  onNext,
  onPlay,
  isPlaying,
  isReady,
  track,
}: {
  onPrev: () => void;
  onNext: () => void;
  onPlay: () => void;
  isPlaying: boolean;
  isReady: boolean;
  track: ITrack;
}): JSX.Element {
  return (
    <div className="flex items-center gap-5 flex-wrap max-md:order-1 max-md:px-2.5">
      <div className="flex gap-1 text-3xl">
        <button
          onClick={onPrev}
          className="active:scale-95 duration-200 hover:brightness-75"
          aria-label="Canción Anterior"
        >
          <AiFillFastBackward />
        </button>
        <button
          onClick={onPlay}
          className="active:scale-95 duration-200 hover:brightness-75"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isReady ? (
            isPlaying ? (
              <IoPauseSharp />
            ) : (
              <IoPlaySharp />
            )
          ) : (
            <CgSpinner className="animate-spin" />
          )}
        </button>
        <button
          onClick={onNext}
          className="active:scale-95 duration-200 hover:brightness-75"
          aria-label="Siguiente Canción"
        >
          <AiFillFastForward />
        </button>
      </div>
      <img
        className="aspect-square size-14 bg-white/5"
        src={track?.cover || "/ui/default-disc.webp"}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = "/ui/default-disc.webp";
          e.currentTarget.classList.add("bg-white");
        }}
        alt={track?.album || "Portada"}
      />

      <div className="text-xs">
        <small className="block">{track?.title}</small>
        <b>{track?.artist}</b>
      </div>
    </div>
  );
}

export default Controls;
