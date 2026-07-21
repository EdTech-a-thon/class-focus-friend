import { useEffect, useState } from "react";
import { loadData, saveData } from "../utils/storage.js";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return loadData(key, initialValue);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      saveData(key, value);
    } catch {
      // The app still works when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}
