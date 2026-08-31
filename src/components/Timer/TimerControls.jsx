import EncouragementMessage from "./EncouragementMessage";

const TimerControls = ({ timerSettings, displayCountdown }) => {
  const { timer, expectation, noiseTone, formatTime, needsTeacherResume, resumeAfterNoise, resetTimer } = timerSettings;
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
        {needsTeacherResume
          ? "The class is waiting for a teacher check-in."
          : timer.isRunning
          ? "Your class is building focus stamina." 
          : showCountdown
          ? `${timer.durationSeconds / 60} minute ${expectation.label.toLowerCase()} session`
          : `${expectation.label} focus session`}
      </p>

      <div className="button-row">
        <button
          className="primary" 
          type="button" 
          onClick={needsTeacherResume ? resumeAfterNoise : timer.toggle}
          disabled={timer.isComplete}
        >
          {timer.isRunning
            ? "Pause session" 
            : timer.isComplete 
            ? "Session complete" 
            : needsTeacherResume
            ? "Resume session"
            : "Start session"}
        </button>

        <button 
          className="plain-button" 
          type="button" 
          onClick={resetTimer}>
            Reset
        </button>
      </div>
    </section>
  )
}

export default TimerControls;
