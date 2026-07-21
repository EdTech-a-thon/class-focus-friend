import { useEffect, useRef, useState } from "react";
import { accessories } from "./data/accessories";
import { activities } from "./data/activities";
import { houseItems, houseRooms } from "./data/houseItems";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMicrophone } from "./hooks/useMicrophone";
import { useTimer } from "./hooks/useTimer";
import { formatTime } from "./utils/formatTime";
import { playNoiseAlert } from "./utils/playNoiseAlert";
import Header from "./components/Header/Header";
import Friend from "./components/Friend/Friend";
import SessionSettingsCard from "./components/SessionSettings/SessionSettingsCard";
import NoiseCard from "./components/NoiseMeter/NoiseCard";
import TimerCard from "./components/Timer/TimerCard";
import RewardShop from "./components/Rewards/RewardShop";
import HouseCard from "./components/House/HouseCard";
import ProgressCard from "./components/Progress/ProgressCard";
import SessionCompletionModal from "./components/SessionCompleteModal/SessionCompletionModal";

export default function App() {
  const [activity, setActivity] = useLocalStorage("class-focus-activity", "independent");
  const [preferredMinutes, setPreferredMinutes] = useLocalStorage("class-focus-minutes", 15);
  const [points, setPoints] = useLocalStorage("class-focus-points", 0);
  const [totalPoints, setTotalPoints] = useLocalStorage("class-focus-total-points", 60);
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

  const activeRoomDetails = houseRooms.find((room) => room.id === activeRoom);
  const roomDecorations = houseItems.filter((item) => item.room === activeRoom && houseItemsOwned.includes(item.id));

  const session = {
    timer,
    activity,
    activities,
    chooseMinutes,
    setActivity,
  };

  const noise = {
    noiseMessage,
    noiseTone,
    expectation,
    microphone
  };

  const timerSettings = {
    timer,
    expectation,
    formatTime,
  };

  const music = {
    musicEnabled,
    setMusicEnabled,
    musicVolume,
    setMusicVolume,
  };

  const rewards = {
    points,
    accessories,
    unlocked,
    equipped,
    buyOrEquip,
  };

  const progress = {
    totalMinutes,
    history,
    totalPoints,
    points,
    activities,
  };

  const house = {
    points,
    houseRooms,
    activeRoom,
    setActiveRoom,
    activeRoomDetails,
    roomDecorations,
    houseItems,
    houseItemsOwned,
    buyHouseItem,
    completedSessions: history.length,
    equipped,
    isCelebrating: showComplete,
    isFocusing: timer.isRunning,
    isMusicPlaying: musicEnabled,
    noiseTone,
  };

  const header = {
    points,

  }

  return (
    <main className="app-shell">
      <Header header={header}/>
      <section className="welcome" id="dashboard">
        <div>
          <p className="eyebrow">Today&apos;s classroom goal</p>
          <h1>Let&apos;s make space for focus.</h1>
          <p>Set a shared work session, notice the room&apos;s energy, and celebrate every small win together.</p>
        </div>
        <Friend
          equipped={equipped}
          isCelebrating={showComplete}
          isFocusing={timer.isRunning}
          isMusicPlaying={musicEnabled}
          noiseTone={noiseTone}
        />
      </section>

      <div className="dashboard-grid">
        <TimerCard timerSettings={timerSettings} music={music}/>

        <SessionSettingsCard session={session}/>

        <NoiseCard noise={noise}/>

        <RewardShop rewards={rewards}/>

        <HouseCard house={house}/>

        <ProgressCard progress={progress}/>
      </div>

      <SessionCompletionModal
        equipped={equipped}
        showComplete={showComplete}
        setShowComplete={setShowComplete}
        minutes={timer.minutes}
      />
      
    </main>
  );
}
