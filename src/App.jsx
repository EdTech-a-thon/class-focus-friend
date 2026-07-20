import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTimer } from "./hooks/useTimer";

const activities = {
  independent: { label: "Independent work", detail: "Very quiet" },
  partner: { label: "Partner work", detail: "Moderate voices" },
  presentation: { label: "Presentation", detail: "One clear speaker" },
};

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function Pet({ equipped }) {
  return (
    <div className="pet-scene" aria-label="A cheerful classroom friend">
      <span className="sparkle one" aria-hidden="true">*</span>
      <span className="sparkle two" aria-hidden="true">*</span>
      <div className="pet" aria-hidden="true">
        {equipped.includes("party-hat") && <span className="pet-hat">▲</span>}
        <span className="pet-ear left" />
        <span className="pet-ear right" />
        <div className="pet-face">
          • &nbsp; •<b>⌣</b>
          {equipped.includes("glasses") && <i className="pet-glasses">⌐■-■</i>}
        </div>
        <div className="pet-body">
          ♥
          {equipped.includes("bow-tie") && <i className="pet-bow">◆</i>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activity, setActivity] = useState("independent");
  const [points, setPoints] = useLocalStorage("class-focus-points", 0);
  const [totalPoints, setTotalPoints] = useLocalStorage("class-focus-total-points", 0);
  const [history, setHistory] = useLocalStorage("class-focus-history", []);
  const [equipped] = useLocalStorage("class-focus-equipped", []);
  const [showComplete, setShowComplete] = useState(false);
  const recordedCompletion = useRef(false);
  const timer = useTimer(15);
  const expectation = activities[activity];

  useEffect(() => {
    if (!timer.isComplete) {
      recordedCompletion.current = false;
      return;
    }
    if (recordedCompletion.current) return;
    recordedCompletion.current = true;
    const completedSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      minutes: timer.minutes,
      activity,
      pointsEarned: timer.minutes,
    };
    setPoints((value) => value + timer.minutes);
    setTotalPoints((value) => value + timer.minutes);
    setHistory((sessions) => [completedSession, ...sessions].slice(0, 20));
    setShowComplete(true);
  }, [activity, setHistory, setPoints, setTotalPoints, timer.isComplete, timer.minutes]);

  const totalMinutes = history.reduce((sum, session) => sum + session.minutes, 0);

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="#dashboard"><span>✦</span> Class Focus Friend</a>
        <p><b>★</b> {points} class points</p>
      </header>
      <section className="welcome" id="dashboard">
        <div>
          <p className="eyebrow">Today&apos;s classroom goal</p>
          <h1>Let&apos;s make space for focus.</h1>
          <p>Set a shared work session, notice the room&apos;s energy, and celebrate every small win together.</p>
        </div>
        <Pet equipped={equipped} />
      </section>
      <div className="dashboard-grid">
        <section className="card timer-card">
          <p className="card-label">Focus session</p>
          <div className="timer-display" aria-live="off">{formatTime(timer.secondsRemaining)}</div>
          <p className="timer-caption">
            {timer.isRunning ? "Your class is building focus stamina." : `${timer.minutes} minute ${expectation.label.toLowerCase()} session`}
          </p>
          <div className="button-row">
            <button className="primary" onClick={timer.toggle} disabled={timer.isComplete}>
              {timer.isRunning ? "Pause session" : timer.isComplete ? "Session complete" : "Start session"}
            </button>
            <button className="plain-button" onClick={timer.reset}>Reset</button>
          </div>
        </section>

        <section className="card setup-card">
          <p className="card-label">Session settings</p>
          <h2>Set the room up for success.</h2>
          <fieldset disabled={timer.isRunning}>
            <legend>Length</legend>
            <div className="choice-row">
              {[5, 10, 15, 20].map((value) => (
                <button className={timer.minutes === value ? "selected" : ""} type="button" key={value} onClick={() => timer.chooseMinutes(value)}>{value} min</button>
              ))}
            </div>
          </fieldset>
          <fieldset disabled={timer.isRunning}>
            <legend>Activity</legend>
            <div className="activity-list">
              {Object.entries(activities).map(([key, item]) => (
                <button className={activity === key ? "selected" : ""} type="button" key={key} onClick={() => setActivity(key)}>
                  <b>{item.label}</b><span>{item.detail}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="card history-card">
          <div className="card-heading">
            <div><p className="card-label">Class progress</p><h2>{totalMinutes} focused minutes</h2></div>
            <span className="session-count">{history.length} sessions</span>
          </div>
          <div className="progress-summary"><span><b>{totalPoints}</b> total points earned</span><span><b>{points}</b> available now</span></div>
          {history.length ? (
            <ul>
              {history.slice(0, 5).map((session) => (
                <li key={session.id}>
                  <span>{new Date(session.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                  <b>{session.minutes} min</b>
                  <em>{activities[session.activity]?.label ?? "Focus session"}</em>
                  <strong>+{session.pointsEarned} ★</strong>
                </li>
              ))}
            </ul>
          ) : <p className="empty-state">Completed focus sessions will appear here.</p>}
        </section>
      </div>
      {showComplete && (
        <div className="modal-backdrop">
          <section className="completion-modal" role="dialog" aria-modal="true" aria-labelledby="complete-title">
            <span className="celebration-mark" aria-hidden="true">✦</span>
            <p className="eyebrow">Focus session complete</p>
            <h2 id="complete-title">Beautiful work, class!</h2>
            <p>You earned <b>{timer.minutes} class points</b> for {timer.minutes} minutes of shared focus.</p>
            <button className="primary" onClick={() => setShowComplete(false)}>Celebrate</button>
          </section>
        </div>
      )}
    </main>
  );
}
