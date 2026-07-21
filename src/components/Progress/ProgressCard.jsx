const ProgressCard = ({ progress }) => {
  const {
    totalMinutes,
    history,
    totalPoints,
    points,
    activities,
    classMilestones,
    houseItems,
    houseItemsOwned,
  } = progress;
  const activeMilestone = classMilestones.find((milestone) =>
    milestone.itemIds.some((itemId) => !houseItemsOwned.includes(itemId))
  ) ?? classMilestones.at(-1);
  const milestoneItems = activeMilestone.itemIds.map((itemId) =>
    houseItems.find((item) => item.id === itemId)
  );
  const collectedItems = milestoneItems.filter((item) => houseItemsOwned.includes(item.id)).length;
  const progressToReward = (collectedItems / milestoneItems.length) * 100;
  const milestoneComplete = collectedItems === milestoneItems.length;

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

      <div className="class-goal" aria-label={`Class milestone progress: ${collectedItems} of ${milestoneItems.length} items collected`}>
        <div className="class-goal-icon" aria-hidden="true">{activeMilestone.icon}</div>
        <div className="class-goal-copy">
          <p className="class-goal-label">Class milestone</p>
          <h3>{activeMilestone.name}</h3>
          <p>
            {milestoneComplete
              ? "Complete! Every piece is in your inventory."
              : `Collect ${milestoneItems.length - collectedItems} more piece${milestoneItems.length - collectedItems === 1 ? "" : "s"} to complete this space. Focus together to earn points for each piece.`}
          </p>
          <div className="class-goal-meter" aria-hidden="true">
            <span style={{ width: `${progressToReward}%` }} />
          </div>
          <small>{collectedItems} / {milestoneItems.length} pieces collected</small>
          <div className="milestone-pieces">
            {milestoneItems.map((item) => {
              const owned = houseItemsOwned.includes(item.id);
              return (
                <div className={owned ? "collected" : ""} key={item.id}>
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                  <b>{owned ? "Collected" : `${item.cost} points`}</b>
                </div>
              );
            })}
          </div>
        </div>
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
