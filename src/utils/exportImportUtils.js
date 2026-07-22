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

const getSaveFileName = () => {
  return `Focus-Friend-Classroom-Save-${new Date().toISOString().slice(0, 10)}.json`;
};

const downloadSaveFile = (data, filename = getSaveFileName()) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return filename;
};

const openSubstituteHandoff = (filename) => {
  const handoffWindow = window.open("", "_blank");
  if (!handoffWindow) return;

  const instructions = `Hello,

Thank you for covering our class today. Focus Friend is ready to use at:
https://class-focus-friend.edtechathon.com

The classroom's saved setup is in the Focus Friend Classroom Save JSON file that was shared with you. Please do not edit or rename that file.

To use it:
1. Open the Focus Friend webpage above.
2. Select "Save Classroom Setup" near the top of the page.
3. Select "Restore Classroom Save."
4. Choose the downloaded file named "${filename}".
5. The page will refresh with our timer settings, points, rewards, and classroom setup.

When you are finished, you can create a new Classroom Save File from the same menu if you would like to pass along the updated classroom progress.

Thank you!`;

  handoffWindow.document.title = "Focus Friend Substitute Handoff";
  handoffWindow.document.body.innerHTML = `
    <main>
      <p class="label">Focus Friend Substitute Handoff</p>
      <h1>Ready-to-send instructions</h1>
      <p>Copy this message into an email, text, or substitute plan. The classroom save file is downloading separately.</p>
      <textarea aria-label="Substitute teacher instructions" readonly>${instructions}</textarea>
      <button type="button">Copy instructions</button>
      <p class="status" aria-live="polite"></p>
    </main>
    <style>
      body { background: #fbf7ed; color: #25433d; font-family: Arial, sans-serif; margin: 0; }
      main { margin: 56px auto; max-width: 720px; padding: 0 24px; }
      .label { color: #d76d54; font-size: 14px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
      h1 { font-size: clamp(30px, 6vw, 48px); margin: 10px 0 16px; }
      p { font-size: 17px; line-height: 1.55; }
      textarea { background: #fffdf7; border: 2px solid #9bceb4; border-radius: 12px; box-sizing: border-box; color: #25433d; font: 16px/1.55 Arial, sans-serif; height: 390px; margin: 18px 0; padding: 18px; resize: vertical; width: 100%; }
      button { background: #25433d; border: 0; border-radius: 999px; color: #fffaf0; cursor: pointer; font-size: 16px; font-weight: 700; padding: 13px 22px; }
      button:hover { background: #39675b; }
      .status { color: #39675b; font-weight: 700; min-height: 26px; }
    </style>
    <script>
      const textarea = document.querySelector("textarea");
      const button = document.querySelector("button");
      const status = document.querySelector(".status");
      textarea.focus();
      textarea.select();
      button.addEventListener("click", async () => {
        await navigator.clipboard.writeText(textarea.value);
        status.textContent = "Instructions copied.";
      });
    </script>
  `;
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
    (settings.friendName === undefined || typeof settings.friendName === "string") &&
    (settings.favoriteSessions === undefined || (
      Array.isArray(settings.favoriteSessions) &&
      settings.favoriteSessions.every((favorite) =>
        favorite &&
        (typeof favorite.id === "number" || typeof favorite.id === "string") &&
        typeof favorite.name === "string" &&
        favorite.name.length > 0 &&
        Number.isFinite(favorite.minutes) &&
        favorite.minutes > 0 &&
        validIds.activities.includes(favorite.activity)
      )
    ));

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
    favoriteSessions: settings.favoriteSessions ?? [],
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

export { restoreSaveFile, validateSaveFile, createSaveFile, getSaveFileName, downloadSaveFile, openSubstituteHandoff };
