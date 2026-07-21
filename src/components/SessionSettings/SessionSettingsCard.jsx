const SessionSettingsCard = ({ session, onClose }) => {
  const {
    timer,
    activity,
    activities,
    chooseMinutes,
    setActivity,
  } = session;
  return (
    <>
      
            <div className="settings-heading">
              <div>
                <p className="card-label">Session settings</p>
                <h2 id="settings-title">Set the room up for success.</h2>
              </div>
              <button className="modal-close" type="button" aria-label="Close session settings" autoFocus onClick={onClose}>&times;</button>
            </div>
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
    </>

  )
}

export default SessionSettingsCard;
