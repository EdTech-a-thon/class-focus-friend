import { exportClassroomSave, importClassroomSave } from "./storage.js";

const isFiniteNonNegativeNumber = (value) => {
  return Number.isFinite(value) && value >= 0;
};

const isStringArray = (value) => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const createSaveFile = (data) => {
  return exportClassroomSave(data);
};

const downloadSaveFile = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  const filename = `Focus-Friend-Classroom-Save-${new Date().toISOString().slice(0, 10)}.json`;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return filename;
};

const validateSaveFile = (data, validIds) => {
  if (
    !data
    || data.app !== "Focus Friend" 
    || data.version !== 1
    || !data.data
  ) {
    throw new Error("Invalid classroom save file");
  }

  const settings = data.data.focusFriendSettings;
  const progress = data.data.focusFriendProgress;
  const rewards = data.data.focusFriendRewards;
  const house = data.data.focusFriendHouse;
  const preferences = data.data.focusFriendPreferences;
  const validHistory = Array.isArray(progress?.history) && progress.history.every((session) =>
    session &&
    isFiniteNonNegativeNumber(session.minutes) &&
    isFiniteNonNegativeNumber(session.pointsEarned) &&
    typeof session.date === "string" &&
    validIds.activities.includes(session.activity)
  );

  const validSettings =
    settings &&
    validIds.activities.includes(settings.activity) &&
    Number.isFinite(settings.preferredMinutes) &&
    settings.preferredMinutes > 0 &&
    (settings.friendName === undefined || typeof settings.friendName === "string");

  const validPreferences =
    preferences &&
    typeof preferences.musicEnabled === "boolean" &&
    Number.isFinite(preferences.musicVolume) &&
    preferences.musicVolume >= 0 &&
    preferences.musicVolume <= 100;

  const validProgress =
    progress &&
    isFiniteNonNegativeNumber(progress.points) &&
    isFiniteNonNegativeNumber(progress.totalPoints) &&
    Number.isInteger(progress.completedSessions) &&
    progress.completedSessions >= 0 &&
    validHistory;

  const validRewards =
    rewards &&
    isStringArray(rewards.unlocked) &&
    rewards.unlocked.every((id) => validIds.accessories.includes(id)) &&
    isStringArray(rewards.equipped) &&
    rewards.equipped.every((id) => rewards.unlocked.includes(id));

  const validHouse =
    house &&
    validIds.rooms.includes(house.activeRoom) &&
    isStringArray(house.houseItemsOwned) &&
    house.houseItemsOwned.every((id) => validIds.houseItems.includes(id));

  if (
    !validSettings 
    || !validPreferences 
    || !validProgress 
    || !validRewards 
    || !validHouse
  ) {
    throw new Error("Invalid classroom save file");
  }

  data.data.focusFriendRewards = {
    unlocked: [...new Set(rewards.unlocked)],
    equipped: [...new Set(rewards.equipped)],
  };
  data.data.focusFriendSettings = {
    ...settings,
    friendName: settings.friendName ?? "Focus Friend",
  };
  data.data.focusFriendHouse = {
    activeRoom: house.activeRoom,
    houseItemsOwned: [...new Set(house.houseItemsOwned)],
  };

  return data;
};

const restoreSaveFile = (data) => {
  importClassroomSave(data);
};

export { restoreSaveFile, validateSaveFile, createSaveFile, downloadSaveFile };
