export const SAVE_FILE_APP_NAME = "On-task Otter";

export const CLASSROOM_STORAGE_KEYS = [
  "onTaskOtterSettings",
  "onTaskOtterProgress",
  "onTaskOtterRewards",
  "onTaskOtterHouse",
];

const readStoredValue = (key) => {
  const value = localStorage.getItem(key);
  return value === null ? undefined : JSON.parse(value);
}

export const saveData = (key, value) => {
  if (!CLASSROOM_STORAGE_KEYS.includes(key)) {
    throw new Error("Unknown On-task Otter storage key");
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export const clearClassroomData = () => {
  for (const key of CLASSROOM_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
}

export const loadData = (key, fallback) => {
  if (!CLASSROOM_STORAGE_KEYS.includes(key)) return fallback;

  try {
    const saved = readStoredValue(key);
    return saved === undefined ? fallback : saved;
  } catch {
    return fallback;
  }
}

export const exportClassroomSave = (data) => {
  const progress = data.onTaskOtterProgress;
  const completedSessions = Number.isInteger(progress?.completedSessions)
    ? progress.completedSessions
    : progress?.history?.length ?? 0;

  return {
    app: SAVE_FILE_APP_NAME,
    version: 1,
    createdAt: new Date().toISOString(),
    data: {
      ...data,
      onTaskOtterProgress: {
        ...progress,
        completedSessions,
      },
    },
  };
}

export const importClassroomSave = (save) => {
  if (!save || save.app !== SAVE_FILE_APP_NAME || save.version !== 1 || !save.data) {
    throw new Error("Invalid classroom save file");
  }

  for (const key of CLASSROOM_STORAGE_KEYS) {
    if (!(key in save.data)) throw new Error("Invalid classroom save file");
  }

  for (const key of CLASSROOM_STORAGE_KEYS) {
    saveData(key, save.data[key]);
  }
}
