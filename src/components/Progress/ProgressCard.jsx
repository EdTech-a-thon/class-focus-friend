const ProgressCard = ({ progress }) => {
  const {
    totalMinutes,
    history,
    totalPoints,
    points,
    activities,
  } = progress;

  return (
    <section className="card history-card">
      <div className="card-heading">
        <div>
          <p className="card-label">Class progress</p>
          <h2>{totalMinutes} focused minutes</h2>
        </div>

        <span className="session-count">
          {history.length} sessions
        </span>
      </div>

      <div className="progress-summary">
        <span>
          <b>{totalPoints}</b> total points earned
        </span>

        <span>
          <b>{points}</b> available now
        </span>
      </div>

      {history.length ? (
        <ul>
          {history.slice(0, 5).map((session) => (
            <li key={session.id}>
              <span>
                {new Date(session.date).toLocaleDateString(undefined, { 
                  month: "short", 
                  day: "numeric" 
                })}
              </span>

              <b>{session.minutes} min</b>

              <em>
                {activities[session.activity]?.label ?? "Focus session"}
              </em>

              <strong>
                +{session.pointsEarned} ★
              </strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">
          Completed focus sessions will appear here.
        </p>
      )}
    </section>
  )
}

export default ProgressCard;