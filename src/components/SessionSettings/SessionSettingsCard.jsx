import { useState } from "react";

const SessionSettingsCard = ({ session, displayCountdown, children }) => {
  const {
    timer,
    activities,
    chooseDuration,
    favoriteSessions,
    saveFavoriteSession,
    deleteFavoriteSession,
  } = session;
  const [favoriteName, setFavoriteName] = useState("");

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

  const durationMinutes = timer.durationSeconds / 60;

  const handleDurationChange = (event) => {
    const minutes = Math.max(1, Math.floor(Number(event.target.value) || 1));
    chooseDuration(minutes * 60);
  };

  const saveFavorite = (event) => {
    event.preventDefault();
    const name = favoriteName.trim();
    if (!name) return;
    saveFavoriteSession(name, { showCountdown, hiddenTimerMode });
    setFavoriteName("");
  };

  const chooseFavorite = (favorite) => {
    chooseDuration(favorite.minutes * 60);
    setShowCountdown(favorite.showCountdown ?? true);
    setHiddenTimerMode(favorite.hiddenTimerMode ?? "none");
    if (Number.isFinite(favorite.soundThreshold)) session.setSoundThreshold(favorite.activity, favorite.soundThreshold);
    session.setActivity(activities[favorite.activity] ? favorite.activity : "partner");
    session.setTrackSound(favorite.trackSound ?? true);
  };

  return (
    <>
      <div className="settings-heading">
        <div>
          <p className="card-label">Session settings</p>
          <h2 id="settings-title">Set up a session.</h2>
        </div>
      </div>
      {favoriteSessions.length > 0 && (
        <section className="favorite-sessions">
          <h3>Favorite setups</h3>
          <ul>
              {favoriteSessions.map((favorite) => (
                <li key={favorite.id}>
                  <button
                    type="button"
                    disabled={timer.isRunning}
                    onClick={() => chooseFavorite(favorite)}
                  >
                    <b>{favorite.name}</b>
                    <span>{favorite.minutes} min · {favorite.trackSound === false ? "No sound meter" : (Number.isFinite(favorite.soundThreshold) ? `Sound limit ${favorite.soundThreshold}%` : "Tracks sound")}</span>
                  </button>
                  <button
                    className="favorite-delete"
                    type="button"
                    aria-label={`Delete ${favorite.name}`}
                    onClick={() => deleteFavoriteSession(favorite.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </section>
      )}
      <fieldset disabled={timer.isRunning}>
        <legend>1. Session length</legend>
        <div className="quick-durations" aria-label="Common session lengths">
          {[5, 10, 15, 20, 30].map((minutes) => (
            <button
              className={durationMinutes === minutes ? "selected" : ""}
              type="button"
              key={minutes}
              onClick={() => chooseDuration(minutes * 60)}
            >
              {minutes} min
            </button>
          ))}
        </div>
        <div className="duration-inputs">
          <label>
            Custom minutes
            <input
              type="number"
              name="minutes"
              min="1"
              step="1"
              inputMode="numeric"
              value={durationMinutes}
              onChange={handleDurationChange}
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>2. Time display</legend>
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
      {children}
      <p className="help-text">Saved sessions include the length, countdown display, and sound level. Microphone calibration is saved separately on this device.</p>
      <form className="save-favorite" onSubmit={saveFavorite}>
        <label>
          Save this setup as a favorite
          <input
            type="text"
            value={favoriteName}
            maxLength="50"
            placeholder="e.g. Quiet reading"
            onChange={(event) => setFavoriteName(event.target.value)}
          />
        </label>
        <button className="outline" type="submit" disabled={timer.isRunning || !favoriteName.trim()}>
          Save favorite
        </button>
      </form>
    </>

  )
}

export default SessionSettingsCard;
