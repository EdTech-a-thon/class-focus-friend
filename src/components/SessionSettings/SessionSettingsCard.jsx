const SessionSettingsCard = ({ session }) => {
  const {
    timer,
    activity,
    activities,
    chooseMinutes,
    setActivity,
  } = session;
  return (
    <section className="card setup-card">
          <p className="card-label">Session settings</p>
          <h2>Set the room up for success.</h2>
          <fieldset disabled={timer.isRunning}>
            <legend>Length</legend>
            <div className="choice-row">
              {[5, 10, 15, 20].map((value) => (
                <button className={timer.minutes === value ? "selected" : ""} aria-pressed={timer.minutes === value} type="button" key={value} onClick={() => chooseMinutes(value)}>{value} min</button>
              ))}
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
        </section>
  )
}

export default SessionSettingsCard;