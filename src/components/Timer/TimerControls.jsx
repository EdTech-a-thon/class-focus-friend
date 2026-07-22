import EncouragementMessage from "./EncouragementMessage";

const TimerControls = ({ timerSettings, displayCountdown }) => {
  const { timer, expectation, noiseTone, formatTime } = timerSettings;
  const {
    showCountdown,
    hiddenTimerMode,
  } = displayCountdown

  const message = <EncouragementMessage mode={hiddenTimerMode} timer={timer} noiseTone={noiseTone}/>

  return (
    <section>
      <p className="card-label">Focus session</p>

      <div className={`timer-display ${showCountdown ? "" : "time-hidden"}`} aria-live="off">
        {showCountdown ? formatTime(timer.secondsRemaining) : message}
      </div>

      <p className="timer-caption">
        {timer.isRunning
          ? "Your class is building focus stamina." 
          : showCountdown
          ? `${timer.durationSeconds / 60} minute ${expectation.label.toLowerCase()} session`
          : `${expectation.label} focus session`}
      </p>

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
