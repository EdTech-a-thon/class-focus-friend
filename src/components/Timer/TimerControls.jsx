const TimerControls = ({ timerSettings }) => {
  const { timer, expectation, formatTime } = timerSettings;
  return (
    <section>
      <p className="card-label">Focus session</p>

      <div className="timer-display" aria-live="off">
        {formatTime(timer.secondsRemaining)}
      </div>

      <p className="timer-caption">
        {timer.isRunning
          ? "Your class is building focus stamina." 
          : `${timer.minutes} minute ${expectation.label.toLowerCase()} session`}
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