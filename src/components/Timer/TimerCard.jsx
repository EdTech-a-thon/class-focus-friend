import { useState } from "react";
import SessionSettingsCard from "../SessionSettings/SessionSettingsCard";
import TimerControls from "./TimerControls";
import NoiseCard from "../NoiseMeter/NoiseCard";

const TimerCard = ({ timerSettings, session, noise, focusMode = false }) => {
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
    <section className={`card timer-card ${focusMode ? "" : "timer-setup-card combined-session-setup"}`}>
      {focusMode
        ? <TimerControls timerSettings={timerSettings} session={session} displayCountdown={displayCountdown} focusMode />
        : <>
            <div className="session-setup-fields"><SessionSettingsCard session={session} displayCountdown={displayCountdown} /></div>
            <NoiseCard noise={noise} embedded />
          </>}
    </section>
  )
}

export default TimerCard;
