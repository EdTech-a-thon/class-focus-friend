import { useCallback, useEffect, useRef, useState } from "react";
import { accessories } from "./data/accessories";
import { activities } from "./data/activities";
import { classMilestones, houseItems, houseRooms } from "./data/houseItems";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTeacherAccount } from "./hooks/useTeacherAccount";
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
import ClearDataModal from "./components/ClearData/ClearDataModal";
import AccountModal from "./components/Account/AccountModal";
import { clearClassroomData } from "./utils/storage";

const App = () => {
  // persistent classroom data
  const [settings, setSettings] = useLocalStorage("onTaskOtterSettings", {
    activity: "independent",
    preferredMinutes: 15,
    otterName: "Otter",
    favoriteSessions: [],
  });
  const [progressData, setProgressData] = useLocalStorage("onTaskOtterProgress", {
    points: 0,
    totalPoints: 0,
    completedSessions: 0,
    history: [],
  });
  const [rewardData, setRewardData] = useLocalStorage("onTaskOtterRewards", {
    unlocked: [],
    equipped: [],
  });
  const [houseData, setHouseData] = useLocalStorage("onTaskOtterHouse", {
    activeRoom: "living",
    houseItemsOwned: [],
  });

  const {
    activity,
    preferredMinutes,
    otterName = "Otter",
    favoriteSessions: savedFavoriteSessions = [],
  } = settings;
  const favoriteSessions = Array.isArray(savedFavoriteSessions) ? savedFavoriteSessions : [];
  const { points, totalPoints, history = [] } = progressData;
  // Older saved classrooms may only have session history, not this total.
  const completedSessions = progressData.completedSessions ?? history.length;
  const { unlocked, equipped } = rewardData;
  const { activeRoom, houseItemsOwned } = houseData;

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

  const setOtterName = (value) => setSettings(
    (current) => ({ ...current, otterName: value })
  );

  const saveFavoriteSession = (name) => setSettings((current) => ({
    ...current,
    favoriteSessions: [
      ...(Array.isArray(current.favoriteSessions) ? current.favoriteSessions : []),
      {
        id: Date.now(),
        name,
        activity: current.activity,
        minutes: current.preferredMinutes,
      },
    ],
  }));

  const deleteFavoriteSession = (id) => setSettings((current) => ({
    ...current,
    favoriteSessions: (Array.isArray(current.favoriteSessions) ? current.favoriteSessions : [])
      .filter((favorite) => favorite.id !== id),
  }));

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

  // temporary session state
  const [showComplete, setShowComplete] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showClearData, setShowClearData] = useState(false);

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
  const resumeTimer = timer.resume;
  const recordedCompletion = useRef(false);
  const redAlertPlayed = useRef(false);
  const timerPausedForNoise = useRef(false);
  const stopTimerAlert = useRef(null);
  const [isTimerAlertPlaying, setIsTimerAlertPlaying] = useState(false);

  useEffect(() => {
    if (noiseTone === "loud") {
      if (timer.isRunning) {
        timerPausedForNoise.current = true;
        pauseTimer();
      }
      if (redAlertPlayed.current) return;
      redAlertPlayed.current = true;
      playNoiseAlert();
      return;
    }

    if (noiseTone === "good" && timerPausedForNoise.current && !timer.isComplete) {
      timerPausedForNoise.current = false;
      resumeTimer();
    }

    if (noiseTone !== "loud") {
      redAlertPlayed.current = false;
    }
  }, [noiseTone, pauseTimer, resumeTimer, timer.isComplete, timer.isRunning]);

  useEffect(() => {
    if (!timer.isComplete) {
      recordedCompletion.current = false;
      return;
    }
    if (recordedCompletion.current) return;
    recordedCompletion.current = true;
    const completedMinutes = timer.durationSeconds / 60;
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
    setHistory((sessions) => [completedSession, ...sessions]);
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

  // Preview mode lets a teacher walk through every room and every customization
  // at once, so they can show a class where the year is heading. Nothing chosen
  // in preview is saved: the class keeps the points, rooms, and decorations it
  // actually earned.
  const [preview, setPreview] = useState(null);
  const isPreviewing = preview !== null;

  const startPreview = () => setPreview({
    activeRoom: houseRooms[0].id,
    houseItemsOwned: houseItems.map((item) => item.id),
    equipped: accessories.map((item) => item.id),
    otterName,
  });

  const stopPreview = () => setPreview(null);

  const togglePreviewId = (ids, id) =>
    ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];

  // What the screen shows: the preview classroom while previewing, the real one
  // the rest of the time.
  const shownActiveRoom = isPreviewing ? preview.activeRoom : activeRoom;
  const shownHouseItemsOwned = isPreviewing ? preview.houseItemsOwned : houseItemsOwned;
  const shownEquipped = isPreviewing ? preview.equipped : equipped;
  const shownUnlocked = isPreviewing ? accessories.map((item) => item.id) : unlocked;
  const shownOtterName = isPreviewing ? preview.otterName : otterName;

  const changeOtterName = (name) => {
    if (!isPreviewing) return setOtterName(name);
    setPreview((current) => ({ ...current, otterName: name }));
  };

  const chooseRoom = (room) => {
    if (!isPreviewing) return setActiveRoom(room);
    setPreview((current) => ({ ...current, activeRoom: room }));
  };

  /** In preview every piece is free to place or take away again. */
  const placeOrBuyHouseItem = (item) => {
    if (!isPreviewing) return buyHouseItem(item);
    setPreview((current) => ({
      ...current,
      houseItemsOwned: togglePreviewId(current.houseItemsOwned, item.id),
    }));
  };

  const wearOrBuyAccessory = (item) => {
    if (!isPreviewing) return buyOrEquip(item);
    setPreview((current) => ({
      ...current,
      equipped: togglePreviewId(current.equipped, item.id),
    }));
  };

  const activeRoomDetails = houseRooms.find((room) => room.id === shownActiveRoom);
  const roomDecorations = houseItems.filter(
    (item) => item.room === shownActiveRoom && shownHouseItemsOwned.includes(item.id)
  );

  const session = {
    timer,
    activity,
    activities,
    chooseDuration,
    setActivity,
    favoriteSessions,
    saveFavoriteSession,
    deleteFavoriteSession,
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
    noiseTone,
    formatTime,
  };

  const rewards = {
    points,
    accessories,
    unlocked: shownUnlocked,
    equipped: shownEquipped,
    buyOrEquip: wearOrBuyAccessory,
    isPreviewing,
  };

  const progress = {
    totalMinutes,
    history,
    totalPoints,
    points,
    activities,
    classMilestones,
    houseItems,
    houseItemsOwned: shownHouseItemsOwned,
    houseRooms,
  };

  const house = {
    points,
    houseRooms,
    activeRoom: shownActiveRoom,
    setActiveRoom: chooseRoom,
    activeRoomDetails,
    roomDecorations,
    houseItems,
    houseItemsOwned: shownHouseItemsOwned,
    buyHouseItem: placeOrBuyHouseItem,
    completedSessions: sessionCount,
    equipped: shownEquipped,
    isPreviewing,
    startPreview,
    stopPreview,
    isCelebrating: showComplete,
    isFocusing: timer.isRunning,
    noiseTone,
    otterName: shownOtterName,
    setOtterName: changeOtterName,
  };

  const classroomData = {
    onTaskOtterSettings: {
      ...settings,
      otterName,
    },
    onTaskOtterProgress: {
      ...progressData,
      completedSessions: sessionCount,
    },
    onTaskOtterRewards: rewardData,
    onTaskOtterHouse: houseData,
  };

  // Puts a classroom loaded from a teacher's account onto the screen.
  const applyClassroom = useCallback((classroom) => {
    setSettings(classroom.onTaskOtterSettings);
    setProgressData(classroom.onTaskOtterProgress);
    setRewardData(classroom.onTaskOtterRewards);
    setHouseData(classroom.onTaskOtterHouse);
  }, [setHouseData, setProgressData, setRewardData, setSettings]);

  const account = useTeacherAccount({ classroomData, applyClassroom });

  const header = {
    points,
    account,
    onOpenAccount: () => setShowAccount(true),
    onOpenExportImport: () => setShowExportImport(true),
  };

  const validSaveIds = {
    activities: Object.keys(activities),
    accessories: accessories.map((item) => item.id),
    houseItems: houseItems.map((item) => item.id),
    rooms: houseRooms.map((room) => room.id),
  };

  const eraseSavedData = async () => {
    // A signed-in teacher's account is emptied too, so the erased classroom
    // cannot come back the next time they open On-task Otter.
    try {
      await account.eraseSavedClassroom();
    } catch {
      // This device is still erased even if the account could not be reached.
    }
    clearClassroomData();
    window.location.reload();
  };

  return (
    <main className="app-shell">
      <Header header={header} />
      <HouseCard house={house} rewards={rewards} />

        <div className="dashboard-grid focus-controls">
        <TimerCard timerSettings={timerSettings} session={session} />

        <NoiseCard noise={noise} />

        <ProgressCard progress={progress} />
      </div>

      <div className="clear-data-section">
        <button className="clear-data-trigger" type="button" onClick={() => setShowClearData(true)}>
          Erase saved data
        </button>
      </div>

      <SessionCompletionModal
        equipped={shownEquipped}
        showComplete={showComplete}
        isTimerAlertPlaying={isTimerAlertPlaying}
        onClose={closeCompletionModal}
        onSilenceAlert={silenceTimerAlert}
        duration={`${timer.durationSeconds / 60} minutes`}
      />

      {showAccount && (
        <AccountModal account={account} onClose={() => setShowAccount(false)} />
      )}

      {showExportImport && (
        <ExportImportModal
          classroomData={classroomData}
          validIds={validSaveIds}
          onClose={() => setShowExportImport(false)}
        />
      )}

      {showClearData && (
        <ClearDataModal
          classroomData={classroomData}
          isSignedIn={Boolean(account.teacher)}
          onClose={() => setShowClearData(false)}
          onConfirm={eraseSavedData}
        />
      )}
    </main>
  );
};

export default App;
