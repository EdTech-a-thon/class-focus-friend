const playTimerCompleteAlert = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return () => {};

  const context = new AudioContextClass();
  let stopped = false;

  const playChime = () => {
    if (stopped) return;

    [
      { frequency: 523.25, start: 0, duration: 0.18 },
      { frequency: 659.25, start: 0.17, duration: 0.18 },
      { frequency: 783.99, start: 0.34, duration: 0.35 },
    ].forEach(({ frequency, start, duration }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const noteStart = context.currentTime + start;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.13, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + duration);
    });
  };

  playChime();
  const repeatAlert = window.setInterval(playChime, 2_000);

  return () => {
    stopped = true;
    window.clearInterval(repeatAlert);
    context.close();
  };
};

export { playTimerCompleteAlert };
