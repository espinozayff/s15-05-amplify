import { CSSProperties, ComponentPropsWithoutRef, JSX, ReactNode } from "react";
import { formatDuration } from "./Player.utils";

interface ProgressCSSProps extends CSSProperties {
  "--progress-width": number;
}

interface AudioProgressBarProps extends ComponentPropsWithoutRef<"input"> {
  isReady: boolean;
  children: ReactNode;
  duration: number;
  currentProgress: number;
  album: string;
}

function ProgressBar(props: AudioProgressBarProps): JSX.Element {
  const { duration, currentProgress, album, children, isReady, ...rest } = props;

  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0.1
    : (currentProgress / duration) * 100;

  const progressStyles: ProgressCSSProps = {
    "--progress-width": Math.round(progressBarWidth || 0.1),
  };

  return (
    <div className="w-full md:max-w-[50%] mx-auto md:space-y-3.5 py-3 max-md:-mt-1 max-md:order-0">
      <small className="block text-xs text-center max-md:hidden">
        Album:
        <b className="ml-2">{album}</b>
      </small>
      <div className="flex items-baseline gap-3 w-full text-xs font-semibold">
        <span className="w-[5ch] hidden md:block text-center">
          {formatDuration(currentProgress)}
        </span>
        {children}
        <div className="progress-bar-container md:hidden pb-2">
          <label htmlFor="musicProgress" className="sr-only"></label>
          <input
            id="musicProgress"
            className="progress-bar w-full cursor-pointer appearance-none h-1"
            type="range"
            name="musicProgress"
            style={progressStyles}
            min={0}
            max={duration ? duration : `${duration}`}
            value={currentProgress}
            {...rest}
          />
          {isReady ? <div className="progress-bar-fill" style={progressStyles}></div> : null}
        </div>
        <span className="w-[5ch] hidden md:block text-center">{formatDuration(duration || 0)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
