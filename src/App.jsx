import { useState } from "react";
import { useTimer } from "./hooks/useTimer";

const activities = {
  independent: { label: "Independent work", detail: "Very quiet" },
  partner: { label: "Partner work", detail: "Moderate voices" },
  presentation: { label: "Presentation", detail: "One clear speaker" },
};

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function Pet() {
  return (
    <div className="pet-scene" aria-label="A cheerful classroom friend">
      <span className="sparkle one" aria-hidden="true">*</span>
      <span className="sparkle two" aria-hidden="true">*</span>
      <div className="pet" aria-hidden="true">
        <span className="pet-ear left" />
        <span className="pet-ear right" />
        <div className="pet-face">• &nbsp; •<b>⌣</b></div>
        <div className="pet-body">♥</div>
      </div>
    </div>
  );
}

export default function App() {
  const [activity, setActivity] = useState("independent");
  const timer = useTimer(15);
  const expectation = activities[activity];

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="#dashboard"><span>✦</span> Class Focus Friend</a>
        <p>Ready for a fresh start</p>
      </header>
      <section className="welcome" id="dashboard">
        <div>
          <p className="eyebrow">Today&apos;s classroom goal</p>
          <h1>Let&apos;s make space for focus.</h1>
          <p>Set a shared work session, notice the room&apos;s energy, and celebrate every small win together.</p>
        </div>
        <Pet />
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
      </div>
    </main>
  );
}
