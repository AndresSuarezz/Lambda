import { useEffect, useState } from "react";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { formatDuration, intervalToDuration } from "date-fns";

const useSessionTimer = () => {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();
  const [remainingMs, setRemainingMs] = useState(Number.NaN);

  useEffect(() => {
    if (!session?.timer_ends_at) return;
    const timerEndAt = new Date(session.timer_ends_at);
    const handle = setInterval(() => {
      const now = new Date();
      const remainingMs = +timerEndAt - +now;
      setRemainingMs(remainingMs);
    }, 500);
    return () => clearInterval(handle);
  }, [session]);

  return remainingMs;
};

export const SessionTimer = () => {
  const remainingMs = useSessionTimer();
  return (
    <div className="session-timer">
      ⏱️{' '}
      {formatDuration(
        intervalToDuration({
          start: Date.now(),
          end: Date.now() + remainingMs,
        })
      )}
    </div>
  );
};
