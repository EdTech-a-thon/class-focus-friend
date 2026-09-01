import EncouragementMessage from "./EncouragementMessage";
import { useState } from "react";

const TimerControls = ({ timerSettings, session, displayCountdown, focusMode = false }) => {
  const { timer, expectation, noiseTone, formatTime, needsTeacherResume, resumeAfterNoise, resetTimer } = timerSettings;
  const {
    showCountdown,
    setShowCountdown,
    hiddenTimerMode,
  } = displayCountdown
  const [quickMinutes, setQuickMinutes] = useState(timer.durationSeconds / 60);
  const [quickActivity, setQuickActivity] = useState(session.activity);
  const [quickTrackSound, setQuickTrackSound] = useState(session.trackSound);
  const [quickShowCountdown, setQuickShowCountdown] = useState(showCountdown);
  const hasStarted = timer.isRunning || timer.secondsRemaining < timer.durationSeconds;

  const launchSession = (setup) => {
    setShowCountdown(setup.showCountdown ?? true);
    session.startSession(setup);
  };

  const message = <EncouragementMessage mode={hiddenTimerMode} timer={timer} noiseTone={noiseTone}/>

  return (
    <section>
      <p className="card-label">Focus session</p>

      {!hasStarted && (
        <div className="focus-launcher">
          {session.favoriteSessions.length > 0 && <div className="focus-favorites">
            <h2>Start a favorite</h2>
            {session.favoriteSessions.map((favorite) => (
              <button key={favorite.id} type="button" onClick={() => launchSession({
                minutes: favorite.minutes,
                activity: session.activities[favorite.activity] ? favorite.activity : "partner",
                trackSound: favorite.trackSound ?? true,
                showCountdown: true,
              })}>
                <b>{favorite.name}</b>
                <span>{favorite.minutes} min · {(session.activities[favorite.activity] ?? session.activities.partner).label}</span>
              </button>
            ))}
          </div>}

          <form className="quick-start" onSubmit={(event) => {
            event.preventDefault();
            launchSession({ minutes: quickMinutes, activity: quickActivity, trackSound: quickTrackSound, showCountdown: quickShowCountdown });
          }}>
            <h2>Quick start</h2>
            <label>Minutes<input type="number" min="1" value={quickMinutes} onChange={(event) => setQuickMinutes(Math.max(1, Number(event.target.value) || 1))} /></label>
            <div className="quick-work-types">
              {Object.entries(session.activities).map(([id, item]) => <label key={id}>
                <input type="radio" name="quick-activity" checked={quickActivity === id} onChange={() => setQuickActivity(id)} /> {item.label}
              </label>)}
            </div>
            <label className="checkbox-option"><input type="checkbox" checked={quickTrackSound} onChange={(event) => setQuickTrackSound(event.target.checked)} /> Track classroom sound</label>
            <label className="checkbox-option"><input type="checkbox" checked={quickShowCountdown} onChange={(event) => setQuickShowCountdown(event.target.checked)} /> Show countdown</label>
            <button className="primary" type="submit">Start focus session</button>
          </form>
        </div>
      )}

      {hasStarted && <><div className={`timer-display ${showCountdown ? "" : "time-hidden"}`} aria-live="off">
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

      {focusMode && <div className="button-row">
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
      </div>}</>}
    </section>
  )
}

export default TimerControls;
