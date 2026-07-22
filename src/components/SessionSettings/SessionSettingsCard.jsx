import { useState } from "react";

const SessionSettingsCard = ({ session, displayCountdown }) => {
  const {
    timer,
    activity,
    activities,
    chooseDuration,
    setActivity,
    favoriteSessions,
    saveFavoriteSession,
    deleteFavoriteSession,
  } = session;
  const [view, setView] = useState("new");
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
    saveFavoriteSession(name);
    setFavoriteName("");
    setView("favorites");
  };

  const chooseFavorite = (favorite) => {
    chooseDuration(favorite.minutes * 60);
    setActivity(favorite.activity);
    setView("new");
  };

  return (
    <>
      <div className="settings-heading">
        <div>
          <p className="card-label">Session settings</p>
          <h2 id="settings-title">Set the room up for success.</h2>
        </div>
      </div>
      <div className="session-view-tabs" role="tablist" aria-label="Session setup view">
        <button
          className={view === "new" ? "selected" : ""}
          type="button"
          role="tab"
          aria-selected={view === "new"}
          onClick={() => setView("new")}
        >
          Start new
        </button>
        <button
          className={view === "favorites" ? "selected" : ""}
          type="button"
          role="tab"
          aria-selected={view === "favorites"}
          onClick={() => setView("favorites")}
        >
          Select favorite
        </button>
      </div>

      {view === "favorites" ? (
        <section className="favorite-sessions" role="tabpanel">
          <p>Choose a saved setup to use its activity and length.</p>
          {favoriteSessions.length ? (
            <ul>
              {favoriteSessions.map((favorite) => (
                <li key={favorite.id}>
                  <button
                    type="button"
                    disabled={timer.isRunning}
                    onClick={() => chooseFavorite(favorite)}
                  >
                    <b>{favorite.name}</b>
                    <span>{favorite.minutes} min · {activities[favorite.activity].label}</span>
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
          ) : (
            <p className="empty-state">Save a setup from Start new to find it here.</p>
          )}
        </section>
      ) : <>
      <fieldset disabled={timer.isRunning}>
        <legend>Length</legend>
        <div className="duration-inputs">
          <label>
            Minutes
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
      </>}
    </>

  )
}

export default SessionSettingsCard;
