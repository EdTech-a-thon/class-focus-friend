import { useEffect, useRef, useState } from "react";

export const useMicrophone = () => {
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState("off");
  const cleanupRef = useRef(() => {});
  const isStartingRef = useRef(false);

  const start = async () => {
    if (isStartingRef.current || status === "on") return;
    isStartingRef.current = true;
    setStatus("starting");

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      isStartingRef.current = false;
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        stream.getTracks().forEach((track) => track.stop());
        setStatus("unsupported");
        return;
      }
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 1024;
      const source = context.createMediaStreamSource(stream);
      const values = new Uint8Array(analyser.fftSize);
      source.connect(analyser);
      setStatus("on");
      let frame;
      let average = 0;
      const measure = () => {
        analyser.getByteTimeDomainData(values);
        const volume = Math.sqrt(values.reduce((sum, value) => sum + (value - 128) ** 2, 0) / values.length);
        average = average * 0.82 + Math.min(100, volume * 7) * 0.18;
        setLevel(Math.round(average));
        frame = requestAnimationFrame(measure);
      };
      measure();
      cleanupRef.current = () => {
        cancelAnimationFrame(frame);
        stream.getTracks().forEach((track) => track.stop());
        context.close();
      };
    } catch {
      setStatus("denied");
    } finally {
      isStartingRef.current = false;
    }
  }

  const stop = () => {
    cleanupRef.current();
    cleanupRef.current = () => {};
    setLevel(0);
    setStatus("off");
  }

  useEffect(() => () => cleanupRef.current(), []);
  return { level, status, start, stop };
}
