import { useEffect, useRef, useState } from "react";
import { accessories } from "./data/accessories";
import { activities } from "./data/activities";
import { classMilestones, houseItems, houseRooms } from "./data/houseItems";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMicrophone } from "./hooks/useMicrophone";
import { useTimer } from "./hooks/useTimer";
import { formatTime } from "./utils/formatTime";
import { playNoiseAlert } from "./utils/playNoiseAlert";
import { playTimerCompleteAlert } from "./utils/playTimerCompleteAlert";
import Header from "./components/Header/Header";
import NoiseCard from "./components/NoiseMeter/NoiseCard";
import TimerCard from "./components/Timer/TimerCard";
import HouseCard from "./components/House/HouseCard";
import ProgressCard from "./components/Progress/ProgressCard";
import SessionCompletionModal from "./components/SessionCompleteModal/SessionCompletionModal";
import ExportImportModal from "./components/ExportImport/ExportImportModal";

const App = () => {
  // persistent classroom data
  const [settings, setSettings] = useLocalStorage("focusFriendSettings", {
    activity: "independent",
    preferredMinutes: 15,
  });
  const [progressData, setProgressData] = useLocalStorage("focusFriendProgress", {
    points: 0,
    totalPoints: 0,
    completedSessions: 0,
    history: [],
  });
  const [rewardData, setRewardData] = useLocalStorage("focusFriendRewards", {
    unlocked: [],
    equipped: [],
  });
  const [houseData, setHouseData] = useLocalStorage("focusFriendHouse", {
    activeRoom: "living",
    houseItemsOwned: [],
  });
  const [preferences, setPreferences] = useLocalStorage("focusFriendPreferences", {
    musicEnabled: false,
    musicVolume: 55,
  });

  const { activity, preferredMinutes } = settings;
  const { points, totalPoints, history = [] } = progressData;
  // Older saved classrooms may only have session history, not this total.
  const completedSessions = progressData.completedSessions ?? history.length;
  const { unlocked, equipped } = rewardData;
  const { activeRoom, houseItemsOwned } = houseData;
  const { musicEnabled, musicVolume } = preferences;

  const setActivity = (value) => setSettings(
    (current) => (
      {
        ...current, activity: typeof value === "function"
          ? value(current.activity)
          : value
      }
    ));

  const setPreferredMinutes = (value) => setSettings(
    (current) => (
      {
        ...current, preferredMinutes: typeof value === "function"
          ? value(current.preferredMinutes)
          : value
      }
    ));

  const setPoints = (value) => setProgressData(
    (current) => (
      {
        ...current, points: typeof value === "function"
          ? value(current.points)
          : value
      }
    ));
  const setTotalPoints = (value) => setProgressData(
    (current) => (
      {
        ...current, totalPoints: typeof value === "function"
          ? value(current.totalPoints)
          : value
      }
    ));
  const setCompletedSessions = (value) => setProgressData(
    (current) => (
      {
        ...current, completedSessions: typeof value === "function"
          ? value(current.completedSessions)
          : value
      }
    ));
  const setHistory = (value) => setProgressData(
    (current) => (
      {
        ...current, history: typeof value === "function"
          ? value(current.history)
          : value
      }
    ));
  const setUnlocked = (value) => setRewardData(
    (current) => (
      {
        ...current, unlocked: typeof value === "function"
          ? value(current.unlocked)
          : value
      }
    ));
  const setEquipped = (value) => setRewardData(
    (current) => (
      {
        ...current, equipped: typeof value === "function"
          ? value(current.equipped)
          : value
      }
    ));
  const setActiveRoom = (value) => setHouseData(
    (current) => (
      {
        ...current, activeRoom: typeof value === "function"
          ? value(current.activeRoom)
          : value
      }
    ));
  const setHouseItemsOwned = (value) => setHouseData(
    (current) => (
      {
        ...current, houseItemsOwned: typeof value === "function"
          ? value(current.houseItemsOwned)
          : value
      }
    ));
  const setMusicEnabled = (value) => setPreferences(
    (current) => (
      {
        ...current, musicEnabled: typeof value === "function"
          ? value(current.musicEnabled)
          : value
      }
    ));
  const setMusicVolume = (value) => setPreferences(
    (current) => (
      {
        ...current, musicVolume: typeof value === "function"
          ? value(current.musicVolume)
          : value
      }
    ));

  // temporary session state
  const [showComplete, setShowComplete] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);

  // runtime state
  const expectation = activities[activity];
  const microphone = useMicrophone();

  const noiseTone = microphone.status !== "on"
    ? "neutral"
    : microphone.level <= expectation.threshold
      ? "good"
      : microphone.level <= expectation.threshold + 18
        ? "warn"
        : "loud";

  const noiseMessage = microphone.status !== "on"
    ? "Ready when you are"
    : noiseTone === "good"
      ? "On track"
      : noiseTone === "warn"
        ? "Getting loud"
        : "Too loud";

  const timer = useTimer(preferredMinutes);
  const pauseTimer = timer.pause;
  const recordedCompletion = useRef(false);
  const redAlertPlayed = useRef(false);
  const stopTimerAlert = useRef(null);
  const [isTimerAlertPlaying, setIsTimerAlertPlaying] = useState(false);

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
    const completedMinutes = Math.max(1, Math.ceil(timer.durationSeconds / 60));
    const completedSession = {
      id: Date.now(),
      date: new Date().toISOString(),
      minutes: completedMinutes,
      activity,
      pointsEarned: completedMinutes,
    };
    setPoints((value) => value + completedMinutes);
    setTotalPoints((value) => value + completedMinutes);
    setCompletedSessions((value) => value + 1);
    setHistory((sessions) => [completedSession, ...sessions].slice(0, 20));
    stopTimerAlert.current = playTimerCompleteAlert();
    setIsTimerAlertPlaying(true);
    setShowComplete(true);
  }, [activity, setCompletedSessions, setHistory, setPoints, setTotalPoints, timer.durationSeconds, timer.isComplete]);

  const silenceTimerAlert = () => {
    stopTimerAlert.current?.();
    stopTimerAlert.current = null;
    setIsTimerAlertPlaying(false);
  };

  const closeCompletionModal = () => {
    silenceTimerAlert();
    setShowComplete(false);
  };

  useEffect(() => () => stopTimerAlert.current?.(), []);

  useEffect(() => {
    if (!showComplete) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeCompletionModal();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showComplete, closeCompletionModal]);

  const totalMinutes = history.reduce(
    (sum, session) => sum + session.minutes, 0
  );

  const sessionCount = completedSessions;

  const buyOrEquip = (item) => {
    if (unlocked.includes(item.id)) {
      setEquipped(
        (items) => items.includes(item.id) 
        ? items.filter((id) => id !== item.id) 
        : [...items, item.id]
      );
      return;
    }
    if (points < item.cost) return;
    setPoints((value) => value - item.cost);
    setUnlocked((items) => [...items, item.id]);
    setEquipped((items) => [...items, item.id]);
  }

  const chooseDuration = (seconds) => {
    timer.chooseDuration(seconds);
    setPreferredMinutes(seconds / 60);
  };

  const buyHouseItem = (item) => {
    const room = houseRooms.find((room) => room.id === item.room);
    if (
      sessionCount < room.sessionsRequired 
      || houseItemsOwned.includes(item.id) 
      || points < item.cost
    ) return;

    setPoints((value) => value - item.cost);
    setHouseItemsOwned((items) => [...items, item.id]);
  }

  const activeRoomDetails = houseRooms.find((room) => room.id === activeRoom);
  const roomDecorations = houseItems.filter(
    (item) => item.room === activeRoom && houseItemsOwned.includes(item.id)
  );

  const session = {
    timer,
    activity,
    activities,
    chooseDuration,
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
    classMilestones,
    houseItems,
    houseItemsOwned,
    houseRooms,
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
    completedSessions: sessionCount,
    equipped,
    isCelebrating: showComplete,
    isFocusing: timer.isRunning,
    isMusicPlaying: musicEnabled,
    noiseTone,
  };

  const header = {
    points,
    onOpenExportImport: () => setShowExportImport(true),
  };

  const classroomData = {
    focusFriendSettings: settings,
    focusFriendProgress: {
      ...progressData,
      completedSessions: sessionCount,
    },
    focusFriendRewards: rewardData,
    focusFriendHouse: houseData,
    focusFriendPreferences: preferences,
  };

  const validSaveIds = {
    activities: Object.keys(activities),
    accessories: accessories.map((item) => item.id),
    houseItems: houseItems.map((item) => item.id),
    rooms: houseRooms.map((room) => room.id),
  };

  return (
    <main className="app-shell">
      <Header header={header} />
      <HouseCard house={house} rewards={rewards} />

      <div className="dashboard-grid ocus-controls">
        <TimerCard timerSettings={timerSettings} music={music} session={session} />

        <NoiseCard noise={noise} />

        <ProgressCard progress={progress} />
      </div>

      <SessionCompletionModal
        equipped={equipped}
        showComplete={showComplete}
        isTimerAlertPlaying={isTimerAlertPlaying}
        onClose={closeCompletionModal}
        onSilenceAlert={silenceTimerAlert}
        duration={formatTime(timer.durationSeconds)}
      />

      {showExportImport && (
        <ExportImportModal
          classroomData={classroomData}
          validIds={validSaveIds}
          onClose={() => setShowExportImport(false)}
        />
      )}
    </main>
  );
};

export default App;
