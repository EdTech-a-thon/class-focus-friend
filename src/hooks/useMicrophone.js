import { useCallback, useEffect, useRef, useState } from "react";

const DEVICE_KEY = "focus-friend-microphone";
const CALIBRATION_KEY = "focus-friend-sound-calibration";

const readSaved = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export const useMicrophone = () => {
  const [rawLevel, setRawLevel] = useState(0);
  const [status, setStatus] = useState("off");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(() => readSaved(DEVICE_KEY, ""));
  const [calibration, setCalibrationState] = useState(() => readSaved(CALIBRATION_KEY, null));
  const cleanupRef = useRef(() => {});
  const isStartingRef = useRef(false);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    const available = await navigator.mediaDevices.enumerateDevices();
    setDevices(available.filter((device) => device.kind === "audioinput"));
  }, []);

  const stop = useCallback(() => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    setRawLevel(0);
    setStatus("off");
  }, []);

  const start = useCallback(async (deviceId = selectedDeviceId) => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;
    cleanupRef.current();
    setStatus("starting");
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      isStartingRef.current = false;
      return false;
    }

    try {
      const audio = deviceId ? { deviceId: { exact: deviceId } } : true;
      const stream = await navigator.mediaDevices.getUserMedia({ audio });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        stream.getTracks().forEach((track) => track.stop());
        setStatus("unsupported");
        return false;
      }
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      context.createMediaStreamSource(stream).connect(analyser);
      const values = new Uint8Array(analyser.fftSize);
      const activeDeviceId = stream.getAudioTracks()[0]?.getSettings().deviceId || deviceId;
      if (activeDeviceId) {
        setSelectedDeviceId(activeDeviceId);
        localStorage.setItem(DEVICE_KEY, JSON.stringify(activeDeviceId));
      }
      await refreshDevices();
      setStatus("on");
      let frame;
      let average = 0;
      const measure = () => {
        analyser.getByteTimeDomainData(values);
        const volume = Math.sqrt(values.reduce((sum, value) => sum + (value - 128) ** 2, 0) / values.length);
        average = average * 0.82 + Math.min(100, volume * 7) * 0.18;
        setRawLevel(average);
        frame = requestAnimationFrame(measure);
      };
      measure();
      cleanupRef.current = () => {
        cancelAnimationFrame(frame);
        stream.getTracks().forEach((track) => track.stop());
        context.close();
      };
      return true;
    } catch (error) {
      setStatus(error?.name === "NotFoundError" || error?.name === "OverconstrainedError" ? "missing" : "denied");
      return false;
    } finally {
      isStartingRef.current = false;
    }
  }, [refreshDevices, selectedDeviceId]);

  const selectDevice = useCallback(async (deviceId) => {
    const wasOn = status === "on";
    stop();
    setSelectedDeviceId(deviceId);
    setCalibrationState(null);
    localStorage.setItem(DEVICE_KEY, JSON.stringify(deviceId));
    localStorage.removeItem(CALIBRATION_KEY);
    if (wasOn) await start(deviceId);
  }, [start, status, stop]);

  const setCalibration = useCallback((quiet, talking) => {
    if (talking - quiet < 1.5) return false;
    const next = { quiet, talking };
    setCalibrationState(next);
    localStorage.setItem(CALIBRATION_KEY, JSON.stringify(next));
    return true;
  }, []);

  useEffect(() => {
    refreshDevices();
    navigator.mediaDevices?.addEventListener?.("devicechange", refreshDevices);
    return () => navigator.mediaDevices?.removeEventListener?.("devicechange", refreshDevices);
  }, [refreshDevices]);

  useEffect(() => () => cleanupRef.current(), []);

  const level = calibration
    ? Math.max(0, Math.min(100, ((rawLevel - calibration.quiet) / (calibration.talking - calibration.quiet)) * 65 + 5))
    : rawLevel;

  return {
    level: Math.round(level), rawLevel, status, devices, selectedDeviceId, calibration,
    start, stop, selectDevice, setCalibration,
  };
};
