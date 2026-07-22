import { useState } from "react";

const TimerControls = ({ timerSettings }) => {
  const { timer, expectation, formatTime } = timerSettings;
  const [showTime, setShowTime] = useState(true);

  return (
    <section>
      <p className="card-label">Focus session</p>

      <div className={`timer-display ${showTime ? "" : "time-hidden"}`} aria-live="off">
        {showTime ? formatTime(timer.secondsRemaining) : "Time hidden"}
      </div>

      <p className="timer-caption">
        {timer.isRunning
          ? "Your class is building focus stamina." 
          : showTime
          ? `${timer.minutes} minute ${expectation.label.toLowerCase()} session`
          : `${expectation.label} focus session`}
      </p>

      <button
        className="timer-visibility-toggle"
        type="button"
        aria-pressed={!showTime}
        onClick={() => setShowTime((visible) => !visible)}
      >
        {showTime ? "Hide exact time" : "Show exact time"}
      </button>

      <div className="button-row">
        <button
          className="primary" 
          type="button" 
          onClick={timer.toggle} 
          disabled={timer.isComplete}
        >
          {timer.isRunning
            ? "Pause session" 
            : timer.isComplete 
            ? "Session complete" 
            : "Start session"}
        </button>

        <button 
          className="plain-button" 
          type="button" 
          onClick={timer.reset}>
            Reset
        </button>
      </div>
    </section>
  )
}

export default TimerControls;
