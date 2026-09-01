import PocketBase from "pocketbase";
import { CLASSROOM_STORAGE_KEYS } from "../utils/storage.js";

// The browser talks to PocketBase directly. An empty setting means PocketBase
// answers on the same address as the website itself, which is the normal setup.
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || "/");
pb.autoCancellation(false);

const TEACHERS = "teachers";

export const currentTeacher = () => {
  if (!pb.authStore.isValid) return null;
  const record = pb.authStore.record;
  return record && record.collectionName === TEACHERS ? record : null;
};

export const signIn = async (email, password) => {
  await pb.collection(TEACHERS).authWithPassword(email.trim(), password);
};

export const createAccount = async (email, password) => {
  await pb.collection(TEACHERS).create({
    email: email.trim(),
    password,
    passwordConfirm: password,
    emailVisibility: false,
    verified: false,
  });
  await signIn(email, password);
};

export const signOut = () => {
  pb.authStore.clear();
};

/** PocketBase's own wording for a failure, so the screen can explain it. */
export const accountErrorMessage = (error, fallback) => {
  const response = error?.response;
  const fieldErrors = response?.data ?? {};
  const firstField = Object.values(fieldErrors)[0];
  return firstField?.message || response?.message || error?.message || fallback;
};

const withSortedKeys = (value) => {
  if (Array.isArray(value)) return value.map(withSortedKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, withSortedKeys(value[key])]),
    );
  }
  return value;
};

/**
 * One classroom always reads as the same text, so the app can tell a real
 * change from the same classroom coming back with its fields in a different
 * order, which is how PocketBase returns them.
 */
export const classroomFingerprint = (classroom) => JSON.stringify(withSortedKeys(classroom));

/** A saved classroom is only usable if it carries every part of the setup. */
const isCompleteClassroom = (classroom) =>
  Boolean(classroom) && CLASSROOM_STORAGE_KEYS.every((key) => key in classroom);

export const fetchSavedClassroom = async (teacherId) => {
  const record = await pb.collection(TEACHERS).getOne(teacherId);
  return isCompleteClassroom(record.classroomData) ? record.classroomData : null;
};

export const saveClassroomToAccount = async (teacherId, classroomData) => {
  await pb.collection(TEACHERS).update(teacherId, { classroomData });
};

/** Confirms a returning teacher's saved sign-in is still good. */
export const refreshSession = async () => {
  await pb.collection(TEACHERS).authRefresh();
};
