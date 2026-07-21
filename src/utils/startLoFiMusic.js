const startLoFiMusic = (volume) => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  master.gain.value = volume;
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.connect(master);
  master.connect(context.destination);

  const notes = [196, 246.94, 293.66, 369.99, 220, 277.18, 329.63, 415.3, 174.61, 220, 261.63, 329.63, 164.81, 207.65, 246.94, 311.13];
  let noteIndex = 0;

  function playNote() {
    const start = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = notes[noteIndex];
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 2.8);
    oscillator.connect(gain);
    gain.connect(filter);
    oscillator.start(start);
    oscillator.stop(start + 2.85);
    noteIndex = (noteIndex + 1) % notes.length;
  }

  playNote();
  const interval = window.setInterval(playNote, 2400);
  return {
    setVolume(value) {
      master.gain.setTargetAtTime(value, context.currentTime, 0.05);
    },
    stop() {
      window.clearInterval(interval);
      context.close();
    },
  };
}

export { startLoFiMusic };