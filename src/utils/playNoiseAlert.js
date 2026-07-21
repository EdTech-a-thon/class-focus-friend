const playNoiseAlert = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.16, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
  gain.connect(context.destination);

  [0, 0.18].forEach((delay) => {
    const oscillator = context.createOscillator();
    oscillator.frequency.value = 660;
    oscillator.connect(gain);
    oscillator.start(context.currentTime + delay);
    oscillator.stop(context.currentTime + delay + 0.12);
  });

  window.setTimeout(() => context.close(), 700);
}

export { playNoiseAlert }