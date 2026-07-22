import { useEffect, useState } from "react";

export const useTimer = (initialMinutes) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsRemaining, setSecondsRemaining] = useState(initialMinutes * 60);
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

  const chooseMinutes = (value) => {
    if (isRunning) return;
    setMinutes(value);
    setSecondsRemaining(value * 60);
  }

  const reset = () => {
    setIsRunning(false);
    setSecondsRemaining(minutes * 60);
  }

  const pause = () => {
    setIsRunning(false);
  }

  return {
    minutes,
    secondsRemaining,
    isRunning,
    isComplete: secondsRemaining === 0,
    chooseMinutes,
    pause,
    reset,
    toggle: () => setIsRunning((running) => !running),
  };
}
