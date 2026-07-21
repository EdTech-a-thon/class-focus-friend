import { useEffect, useRef, useState } from "react";
import { accessories } from "./data/accessories";
import { houseItems, houseRooms } from "./data/houseItems";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMicrophone } from "./hooks/useMicrophone";
import { useTimer } from "./hooks/useTimer";

const activities = {
  independent: { label: "Independent work", detail: "Very quiet", threshold: 22 },
  partner: { label: "Partner work", detail: "Moderate voices", threshold: 48 },
  presentation: { label: "Presentation", detail: "One clear speaker", threshold: 68 },
};

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function playNoiseAlert() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.16, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
  gain.connect(context.destination);

  [0, 0.18].forEach((delay) => {
    const oscillator = context.createOscillator();
    oscillator.frequency.value = 660;
    oscillator.connect(gain);
    oscillator.start(context.currentTime + delay);
    oscillator.stop(context.currentTime + delay + 0.12);
  });

  window.setTimeout(() => context.close(), 700);
}

function startLoFiMusic(volume) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  master.gain.value = volume;
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(master);
  master.connect(context.destination);

  const notes = [196, 246.94, 293.66, 369.99, 220, 277.18, 329.63, 415.3, 174.61, 220, 261.63, 329.63, 164.81, 207.65, 246.94, 311.13];
  let noteIndex = 0;

  function playNote() {
    const start = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = notes[noteIndex];
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 2.8);
    oscillator.connect(gain);
    gain.connect(filter);
    oscillator.start(start);
    oscillator.stop(start + 2.85);
    noteIndex = (noteIndex + 1) % notes.length;
  }

  playNote();
  const interval = window.setInterval(playNote, 2400);
  return {
    setVolume(value) {
      master.gain.setTargetAtTime(value, context.currentTime, 0.05);
    },
    stop() {
      window.clearInterval(interval);
      context.close();
    },
  };
}

function Friend({ equipped }) {
  return (
    <div className="friend-scene" aria-label="A cheerful classroom friend">
      <span className="sparkle one" aria-hidden="true">*</span>
      <span className="sparkle two" aria-hidden="true">*</span>
      <div className="friend" aria-hidden="true">
        {equipped.includes("party-hat") && <span className="friend-hat">▲</span>}
        <span className="friend-ear left" />
        <span className="friend-ear right" />
        <div className="friend-face">
          • &nbsp; •<b>⌣</b>
          {equipped.includes("glasses") && <i className="friend-glasses">⌐■-■</i>}
        </div>
        <div className="friend-body">
          ♥
          {equipped.includes("bow-tie") && <i className="friend-bow">◆</i>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activity, setActivity] = useLocalStorage("class-focus-activity", "independent");
  const [preferredMinutes, setPreferredMinutes] = useLocalStorage("class-focus-minutes", 15);
  const [points, setPoints] = useLocalStorage("class-focus-points", 0);
  const [totalPoints, setTotalPoints] = useLocalStorage("class-focus-total-points", 0);
  const [history, setHistory] = useLocalStorage("class-focus-history", []);
  const [unlocked, setUnlocked] = useLocalStorage("class-focus-unlocked", []);
  const [equipped, setEquipped] = useLocalStorage("class-focus-equipped", []);
  const [houseItemsOwned, setHouseItemsOwned] = useLocalStorage("class-focus-house-items", []);
  const [activeRoom, setActiveRoom] = useState("living");
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useLocalStorage("class-focus-music-volume", 55);
  const [showComplete, setShowComplete] = useState(false);
  const recordedCompletion = useRef(false);
  const redAlertPlayed = useRef(false);
  const musicPlayer = useRef(null);
  const timer = useTimer(preferredMinutes);
  const microphone = useMicrophone();
  const expectation = activities[activity];
  const noiseTone = microphone.status !== "on" ? "neutral" : microphone.level <= expectation.threshold ? "good" : microphone.level <= expectation.threshold + 18 ? "warn" : "loud";
  const noiseMessage = microphone.status !== "on" ? "Ready when you are" : noiseTone === "good" ? "On track" : noiseTone === "warn" ? "Getting loud" : "Too loud";
  const pauseTimer = timer.pause;

  useEffect(() => {
    if (noiseTone !== "loud") {
      redAlertPlayed.current = false;
      return;
    }
    if (redAlertPlayed.current) return;
    redAlertPlayed.current = true;
    pauseTimer();
    playNoiseAlert();
  }, [noiseTone, pauseTimer]);

  useEffect(() => {
    if (!musicEnabled) return;
    musicPlayer.current = startLoFiMusic(musicVolume / 100);
    return () => {
      musicPlayer.current?.stop();
      musicPlayer.current = null;
    };
  }, [musicEnabled]);

  useEffect(() => {
    musicPlayer.current?.setVolume(musicVolume / 100);
  }, [musicVolume]);

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

  useEffect(() => {
    if (!showComplete) return;
    function closeOnEscape(event) {
      if (event.key === "Escape") setShowComplete(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showComplete]);

  const totalMinutes = history.reduce((sum, session) => sum + session.minutes, 0);

  function buyOrEquip(item) {
    if (unlocked.includes(item.id)) {
      setEquipped((items) => items.includes(item.id) ? items.filter((id) => id !== item.id) : [...items, item.id]);
      return;
    }
    if (points < item.cost) return;
    setPoints((value) => value - item.cost);
    setUnlocked((items) => [...items, item.id]);
    setEquipped((items) => [...items, item.id]);
  }

  function chooseMinutes(value) {
    timer.chooseMinutes(value);
    setPreferredMinutes(value);
  }

  function buyHouseItem(item) {
    if (houseItemsOwned.includes(item.id) || points < item.cost) return;
    setPoints((value) => value - item.cost);
    setHouseItemsOwned((items) => [...items, item.id]);
  }

  const currentRoom = houseRooms.find((room) => room.id === activeRoom);
  const roomDecorations = houseItems.filter((item) => item.room === activeRoom && houseItemsOwned.includes(item.id));

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
        <Friend equipped={equipped} />
      </section>
      <div className="dashboard-grid">
        <section className="card timer-card">
          <p className="card-label">Focus session</p>
          <div className="timer-display" aria-live="off">{formatTime(timer.secondsRemaining)}</div>
          <p className="timer-caption">
            {timer.isRunning ? "Your class is building focus stamina." : `${timer.minutes} minute ${expectation.label.toLowerCase()} session`}
          </p>
           <div className="button-row">
            <button className="primary" type="button" onClick={timer.toggle} disabled={timer.isComplete}>
              {timer.isRunning ? "Pause session" : timer.isComplete ? "Session complete" : "Start session"}
            </button>
             <button className="plain-button" type="button" onClick={timer.reset}>Reset</button>
           </div>
           <button
             className={`music-button ${musicEnabled ? "playing" : ""}`}
             type="button"
             aria-pressed={musicEnabled}
             onClick={() => setMusicEnabled((enabled) => !enabled)}
           >
             <span aria-hidden="true">♫</span> {musicEnabled ? "Lo-fi music playing" : "Play lo-fi music"}
           </button>
           <label className="volume-control">
             <span>Music volume</span>
             <input
               type="range"
               min="0"
               max="100"
               value={musicVolume}
               onChange={(event) => setMusicVolume(Number(event.target.value))}
             />
             <output>{musicVolume}%</output>
           </label>
           <p className="music-note">Optional background music, available before, during, or after a session.</p>
         </section>

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

        <section className="card noise-card">
          <div className="card-heading">
            <div><p className="card-label">Classroom sound</p><h2>{noiseMessage}</h2></div>
            <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
          </div>
          <p className="noise-expectation">Goal for {expectation.label.toLowerCase()}: <b>{expectation.detail}</b></p>
          <div className="meter" role="meter" aria-label="Current classroom sound" aria-valuemin="0" aria-valuemax="100" aria-valuenow={microphone.level}>
            <span className={noiseTone} style={{ width: `${microphone.level}%` }} />
          </div>
          <div className="noise-scale"><span>Quiet</span><span>Talking</span><span>Lively</span></div>
          <button className="outline" type="button" aria-pressed={microphone.status === "on"} onClick={microphone.status === "on" ? microphone.stop : microphone.start}>
            {microphone.status === "on" ? "Stop sound meter" : "Turn on sound meter"}
          </button>
          {microphone.status === "denied" && <p className="help-text">Microphone access was not available. You can still run a focus session.</p>}
          {microphone.status === "unsupported" && <p className="help-text">This browser cannot use the sound meter. The other classroom tools still work.</p>}
        </section>

        <section className="card shop-card">
          <div className="card-heading">
            <div><p className="card-label">Reward shelf</p><h2>Dress up your class friend.</h2></div>
            <span className="points-badge">★ {points}</span>
          </div>
          <div className="reward-list">
            {accessories.map((item) => {
              const owned = unlocked.includes(item.id);
              const wearing = equipped.includes(item.id);
              return (
                <article className="reward" key={item.id}>
                  <span className="reward-icon" aria-hidden="true">{item.icon}</span>
                  <div><b>{item.name}</b><small>{owned ? wearing ? "Wearing now" : "Unlocked" : `${item.cost} points`}</small></div>
                  <button type="button" disabled={!owned && points < item.cost} onClick={() => buyOrEquip(item)}>
                    {owned ? wearing ? "Remove" : "Wear" : "Unlock"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="card house-card">
          <div className="card-heading">
            <div><p className="card-label">Friend&apos;s house</p><h2>Make a home together.</h2></div>
            <span className="points-badge">★ {points}</span>
          </div>
          <p className="house-intro">Every room is empty and ready for your class to make it special.</p>
          <div className="room-tabs" role="tablist" aria-label="Rooms in the friend&apos;s house">
            {houseRooms.map((room) => (
              <button key={room.id} className={activeRoom === room.id ? "selected" : ""} type="button" role="tab" aria-selected={activeRoom === room.id} onClick={() => setActiveRoom(room.id)}>
                <span aria-hidden="true">{room.icon}</span>{room.name}
              </button>
            ))}
          </div>
          <section className="room-scene" style={{ backgroundImage: `url(${currentRoom.image})` }} aria-label={`${currentRoom.name} in the friend's house`}>
            <div className="room-scene-label"><span>{currentRoom.icon}</span><div><b>{currentRoom.name}</b><small>{currentRoom.description}</small></div></div>
            {roomDecorations.length ? (
              <div className="placed-decorations" aria-label="Decorations in this room">
                {roomDecorations.map((item) => <img key={item.id} src={item.image} alt={item.name} />)}
              </div>
            ) : <p className="empty-room">This room is empty. Choose something from the catalog to begin decorating.</p>}
          </section>
          <div className="house-catalog">
            <p className="catalog-label">{currentRoom.name} catalog</p>
            <div className="reward-list">
              {houseItems.filter((item) => item.room === activeRoom).map((item) => {
                const owned = houseItemsOwned.includes(item.id);
                return (
                  <article className="reward" key={item.id}>
                    <img className="reward-icon house-item-icon" src={item.image} alt="" />
                    <div><b>{item.name}</b><small>{owned ? "In this room" : `${item.cost} points`}</small></div>
                    <button type="button" disabled={owned || points < item.cost} onClick={() => buyHouseItem(item)}>{owned ? "Placed" : "Buy"}</button>
                  </article>
                );
              })}
            </div>
          </div>
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
            <button className="primary" type="button" autoFocus onClick={() => setShowComplete(false)}>Celebrate</button>
          </section>
        </div>
      )}
    </main>
  );
}
