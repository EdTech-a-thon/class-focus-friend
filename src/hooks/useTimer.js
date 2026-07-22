import { useEffect, useState } from "react";

export const useTimer = (initialMinutes) => {
  const initialSeconds = initialMinutes * 60;
  const [durationSeconds, setDurationSeconds] = useState(initialSeconds);
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsRemaining === 0) return;
    const timer = window.setTimeout(() => {
      setSecondsRemaining((seconds) => seconds - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isRunning, secondsRemaining]);

  useEffect(() => {
    if (secondsRemaining === 0) setIsRunning(false);
  }, [secondsRemaining]);

  const chooseDuration = (value) => {
    if (isRunning) return;
    setDurationSeconds(value);
    setSecondsRemaining(value);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsRemaining(durationSeconds);
  };

  const pause = () => {
    setIsRunning(false);
  };

  return {
    durationSeconds,
    secondsRemaining,
    isRunning,
    isComplete: secondsRemaining === 0,
    chooseDuration,
    pause,
    reset,
    toggle: () => setIsRunning((running) => !running),
  };
}
