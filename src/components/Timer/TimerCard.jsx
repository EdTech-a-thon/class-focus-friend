import { useEffect, useState } from "react";
import SessionSettingsCard from "../SessionSettings/SessionSettingsCard";
import MusicControls from "./MusicControls";
import TimerControls from "./TimerControls";
import Modal from "../Modal/Modal";

const TimerCard = ({ timerSettings, music, session }) => {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!showSettings) return;

    function closeOnEscape(event) {
      if (event.key === "Escape") setShowSettings(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showSettings]);

  return (
    <>
        <section className="card timer-card">
          <button
            className="settings-button"
            type="button"
            aria-label="Open session settings"
            onClick={() => setShowSettings(true)}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
              <path d="m19.4 13.5 1.1 1.9-2 3.4h-2.2l-1.2.7-1.1 1.9h-4l-1.1-1.9-1.2-.7H5.5l-2-3.4 1.1-1.9v-1.4l-1.1-1.9 2-3.4h2.2l1.2-.7L10 4.2h4l1.1 1.9 1.2.7h2.2l2 3.4-1.1 1.9v1.4Z" />
            </svg>
          </button>
          <TimerControls timerSettings={timerSettings}/>
          <MusicControls music={music}/>
        </section>

        {showSettings && (
          <Modal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            className="setup-modal"
          >
            <SessionSettingsCard session={session} />
          </Modal>
        )}
    </>
  )
}

export default TimerCard;
