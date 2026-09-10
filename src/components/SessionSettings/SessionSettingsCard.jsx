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
          <h2 id="settings-title">Create a session preset.</h2>
        </div>
      </div>
      <label className="preset-name">
        Preset name
        <input
          type="text"
          form="save-session-preset"
          required
          value={favoriteName}
          maxLength="50"
          placeholder="e.g. Quiet reading"
          onChange={(event) => setFavoriteName(event.target.value)}
        />
      </label>
      <fieldset className="session-duration" disabled={timer.isRunning} aria-label="Session length">
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
      <label className="checkbox-option countdown-option">
        <input type="checkbox" checked={showCountdown} onChange={(event) => setShowCountdown(event.target.checked)} />
        Show countdown
      </label>
      {!showCountdown && <label className="hidden-countdown-choice">
        While time is hidden
        <select value={hiddenTimerMode} onChange={(event) => setHiddenTimerMode(event.target.value)}>
          <option value="none">No messages</option>
          <option value="generic">General encouragements</option>
          <option value="progress">Encouragements that follow progress</option>
        </select>
      </label>}
      {children}
      <form id="save-session-preset" className="save-favorite" onSubmit={saveFavorite}>
        <button className="outline" type="submit" disabled={timer.isRunning || !favoriteName.trim()}>
          Save preset
        </button>
      </form>
      {favoriteSessions.length > 0 && (
        <section className="favorite-sessions">
          <h3>Saved presets</h3>
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

    </>

  )
}

export default SessionSettingsCard;
