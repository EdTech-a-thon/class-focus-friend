import { useState } from "react";
import SessionSettingsCard from "../SessionSettings/SessionSettingsCard";
import TimerControls from "./TimerControls";

const TimerCard = ({ timerSettings, session, focusMode = false }) => {
  const [showCountdown, setShowCountdown] = useState(true);

  // "none", "generic", "progressive"
  const [hiddenTimerMode, setHiddenTimerMode] = useState("none");

  const displayCountdown = {
    showCountdown,
    setShowCountdown,
    hiddenTimerMode,
    setHiddenTimerMode
  }

  return (
    <section className={`card timer-card ${focusMode ? "" : "timer-setup-card"}`}>
      {focusMode
        ? <TimerControls timerSettings={timerSettings} displayCountdown={displayCountdown} focusMode />
        : <SessionSettingsCard session={session} displayCountdown={displayCountdown} />}
    </section>
  )
}

export default TimerCard;
