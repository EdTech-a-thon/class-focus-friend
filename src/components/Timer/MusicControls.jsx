const MusicControls = ({ music }) => {
  const {
    musicEnabled,
    setMusicEnabled,
    musicVolume,
    setMusicVolume,
  } = music;

  return (
    <>
      <button
        className={`music-button ${musicEnabled ? "playing" : ""}`}
        type="button"
        aria-pressed={musicEnabled}
        onClick={() => setMusicEnabled((enabled) => !enabled)}
      >
        <span aria-hidden="true">♫</span>{" "}
        {musicEnabled
          ? "Lo-fi music playing"
          : "Play lo-fi music"}
      </button>

      <label className="volume-control">
        <span>Music volume</span>

        <input
          type="range"
          min="0"
          max="100"
          value={musicVolume}
          onChange={(event) =>
            setMusicVolume(Number(event.target.value))
          }
        />

        <output>{musicVolume}%</output>
      </label>

      <p className="music-note">
        Optional background music, available before, during, or after a
        session.
      </p>
    </>
  );
};

export default MusicControls;