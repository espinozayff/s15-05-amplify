import { ComponentPropsWithoutRef, JSX, ReactNode } from "react";
import { formatDuration } from "./Player.utils";

interface AudioProgressBarProps extends ComponentPropsWithoutRef<"input"> {
  children: ReactNode;
  duration: number;
  currentProgress: number;
  album: string;
}

function ProgressBar(props: AudioProgressBarProps): JSX.Element {
  const { duration, currentProgress, album, children } = props;

  return (
    <div className="w-full md:max-w-[50%] mx-auto md:space-y-3.5 md:pt-3.5 pb-3.5 max-md:-mt-1 max-md:order-0">
      <small className="block text-xs text-center max-md:hidden">
        Album:
        <b>{album}</b>
      </small>
      <div className="flex items-baseline gap-3 w-full text-xs font-semibold">
        <span className="w-[5ch] hidden md:block text-center">
          {formatDuration(currentProgress)}
        </span>
        {children}
        <span className="w-[5ch] hidden md:block text-center">{formatDuration(duration || 0)}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
