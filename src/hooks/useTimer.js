import { useEffect, useState } from "react";

export function useTimer(initialMinutes) {
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

  function chooseMinutes(value) {
    if (isRunning) return;
    setMinutes(value);
    setSecondsRemaining(value * 60);
  }

  function reset() {
    setIsRunning(false);
    setSecondsRemaining(minutes * 60);
  }

  return {
    minutes,
    secondsRemaining,
    isRunning,
    isComplete: secondsRemaining === 0,
    chooseMinutes,
    reset,
    toggle: () => setIsRunning((running) => !running),
  };
}
