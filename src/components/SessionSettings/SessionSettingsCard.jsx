const SessionSettingsCard = ({ session, displayCountdown }) => {
  const {
    timer,
    activity,
    activities,
    chooseDuration,
    setActivity
  } = session;

  const {
    showCountdown,
    setShowCountdown,
    hiddenTimerMode,
    setHiddenTimerMode
  } = displayCountdown;

  const handleShowCountdown = (event) => {
    setShowCountdown(!showCountdown);
  };

  const handleHiddenTimerMode = (event) => {
    setHiddenTimerMode(event.target.value);
  };

  const durationMinutes = Math.floor(timer.durationSeconds / 60);
  const durationSeconds = timer.durationSeconds % 60;

  const handleDurationChange = (event) => {
    const maximum = event.target.name === "seconds" ? 59 : Number.MAX_SAFE_INTEGER;
    const value = Math.min(maximum, Math.max(0, Number(event.target.value) || 0));
    const nextDuration = event.target.name === "minutes"
      ? value * 60 + durationSeconds
      : durationMinutes * 60 + value;

    if (nextDuration > 0) chooseDuration(nextDuration);
  };

  return (
    <>
      <div className="settings-heading">
        <div>
          <p className="card-label">Session settings</p>
          <h2 id="settings-title">Set the room up for success.</h2>
        </div>
      </div>
      <fieldset disabled={timer.isRunning}>
        <legend>Length</legend>
        <div className="duration-inputs">
          <label>
            Minutes
            <input
              type="number"
              name="minutes"
              min="0"
              step="1"
              inputMode="numeric"
              value={durationMinutes}
              onChange={handleDurationChange}
            />
          </label>
          <label>
            Seconds
            <input
              type="number"
              name="seconds"
              min="0"
              max="59"
              step="1"
              inputMode="numeric"
              value={durationSeconds}
              onChange={handleDurationChange}
            />
          </label>
        </div>
      </fieldset>
      <fieldset disabled={timer.isRunning}>
        <legend>Activity</legend>
        <div className="activity-list">
          {Object.entries(activities).map(([key, item]) => (
            <button className={activity === key ? "selected" : ""} aria-pressed={activity === key} type="button" key={key} onClick={() => setActivity(key)}>
              <b>{item.label}</b><span>{item.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Countdown Display</legend>
        <div>
          <label>
            <input
              type="radio"
              name="showCountdown"
              value={true}
              checked={showCountdown}
              onChange={handleShowCountdown}
            />
            Show countdown
          </label>

          <br></br>

          <label>
            <input
              type="radio"
              name="showCountdown"
              value={false}
              checked={!showCountdown}
              onChange={handleShowCountdown}
            />
            Hide countdown
          </label>
        </div>
      </fieldset>

      {!showCountdown && <fieldset>
        <legend>When countdown is hidden...</legend>

          <label>
            <input
              type="radio"
              name="hiddenTimerMode"
              value="none"
              checked={hiddenTimerMode === "none"}
              onChange={handleHiddenTimerMode}
            />
            No messages
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="hiddenTimerMode"
              value="generic"
              checked={hiddenTimerMode === "generic"}
              onChange={handleHiddenTimerMode}
            />
            General encouragements
          </label>

          <br />

          <label className="tooltip-label">
            <input
              type="radio"
              name="hiddenTimerMode"
              value="progress"
              checked={hiddenTimerMode === "progress"}
              onChange={handleHiddenTimerMode}
            />

            <span className="label-text">
              Session-aware encouragements

              <span
                className="info-icon"
                tabIndex={0}
                aria-label="Learn more about session-aware encouragements"
              >
                ⓘ

                <span className="tooltip">
                  <strong>Messages change as the session progresses.</strong>
                  <br /><br />
                  🌱 Beginning: "Let's get started!"
                  <br />
                  📚 Middle: "You're making great progress."
                  <br />
                  🌟 End: "Finish strong!"
                  <br /><br />
                  Encouragements help students stay motivated without revealing how much
                  time remains.
                </span>
              </span>
            </span>
          </label>
      </fieldset>}
    </>

  )
}

export default SessionSettingsCard;
