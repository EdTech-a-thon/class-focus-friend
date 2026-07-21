import { useEffect, useRef, useState } from "react";

export function useMicrophone() {
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState("off");
  const cleanupRef = useRef(() => {});

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
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
    }
  }

  function stop() {
    cleanupRef.current();
    cleanupRef.current = () => {};
    setLevel(0);
    setStatus("off");
  }

  useEffect(() => () => cleanupRef.current(), []);
  return { level, status, start, stop };
}
