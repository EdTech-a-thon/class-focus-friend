export const FOCUS_FRIEND_STORAGE_KEYS = [
  "focusFriendSettings",
  "focusFriendProgress",
  "focusFriendRewards",
  "focusFriendHouse",
  "focusFriendPreferences",
];

const LEGACY_STORAGE = {
  focusFriendSettings: {
    activity: "class-focus-activity",
    preferredMinutes: "class-focus-minutes",
  },
  focusFriendProgress: {
    points: "class-focus-points",
    totalPoints: "class-focus-total-points",
    completedSessions: "class-focus-completed-sessions",
    history: "class-focus-history",
  },
  focusFriendRewards: {
    unlocked: "class-focus-unlocked",
    equipped: "class-focus-equipped",
  },
  focusFriendHouse: {
    activeRoom: "class-focus-active-room",
    houseItemsOwned: "class-focus-house-items",
  },
  focusFriendPreferences: {
    musicEnabled: "class-focus-music-enabled",
    musicVolume: "class-focus-music-volume",
  },
};

const readStoredValue = (key) => {
  const value = localStorage.getItem(key);
  return value === null ? undefined : JSON.parse(value);
}

const migrateLegacyData = (key, fallback) => {
  const legacyFields = LEGACY_STORAGE[key];
  if (!legacyFields) return fallback;

  const migrated = { ...fallback };
  let foundLegacyData = false;
  let foundCompletedSessions = false;

  for (const [field, legacyKey] of Object.entries(legacyFields)) {
    try {
      const value = readStoredValue(legacyKey);
      if (value !== undefined) {
        migrated[field] = value;
        foundLegacyData = true;
        if (field === "completedSessions") foundCompletedSessions = true;
      }
    } catch {
      // Ignore a damaged legacy value and keep the safe default.
    }
  }

  if (foundLegacyData && "completedSessions" in migrated && !foundCompletedSessions) {
    migrated.completedSessions = migrated.history?.length ?? 0;
  }

  if (foundLegacyData) saveData(key, migrated);
  return migrated;
}

export const saveData = (key, value) => {
  if (!FOCUS_FRIEND_STORAGE_KEYS.includes(key)) {
    throw new Error("Unknown Focus Friend storage key");
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export const clearFocusFriendData = () => {
  for (const key of FOCUS_FRIEND_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }

  for (const fields of Object.values(LEGACY_STORAGE)) {
    for (const key of Object.values(fields)) {
      localStorage.removeItem(key);
    }
  }
}

export const loadData = (key, fallback) => {
  if (!FOCUS_FRIEND_STORAGE_KEYS.includes(key)) return fallback;

  try {
    const saved = readStoredValue(key);
    return saved === undefined ? migrateLegacyData(key, fallback) : saved;
  } catch {
    return fallback;
  }
}

export const exportClassroomSave = (data) => {
  const progress = data.focusFriendProgress;
  const completedSessions = Number.isInteger(progress?.completedSessions)
    ? progress.completedSessions
    : progress?.history?.length ?? 0;

  return {
    app: "Focus Friend",
    version: 1,
    createdAt: new Date().toISOString(),
    data: {
      ...data,
      focusFriendProgress: {
        ...progress,
        completedSessions,
      },
    },
  };
}

export const importClassroomSave = (save) => {
  if (!save || save.app !== "Focus Friend" || save.version !== 1 || !save.data) {
    throw new Error("Invalid classroom save file");
  }

  for (const key of FOCUS_FRIEND_STORAGE_KEYS) {
    if (!(key in save.data)) throw new Error("Invalid classroom save file");
  }

  for (const key of FOCUS_FRIEND_STORAGE_KEYS) {
    saveData(key, save.data[key]);
  }
}
