const Friend = ({ equipped, isCelebrating, isFocusing, isMusicPlaying, noiseTone }) => {
  const isLoud = noiseTone === "loud";
  const state = isCelebrating ? "celebrating" : isLoud ? "loud" : isFocusing ? "focusing" : "idle";
  const isDancing = isMusicPlaying && !isLoud && !isCelebrating;
  const messages = {
    celebrating: "We did it!",
    focusing: "In the zone...",
    idle: "Ready when you are!",
    loud: "A little quieter, please!",
  };

  return (
    <div className={`friend-scene state-${state} ${isDancing ? "is-dancing" : ""}`}>
      <p className="friend-message" aria-live="polite">{messages[state]}</p>
      <span className="sparkle one" aria-hidden="true">✦</span>
      <span className="sparkle two" aria-hidden="true">✦</span>
      <span className="music-note-float one" aria-hidden="true">♪</span>
      <span className="music-note-float two" aria-hidden="true">♫</span>
      <div className="friend" role="img" aria-label={`Focus friend is ${state}`}>
        {equipped.includes("party-hat") && <span className="friend-hat">▲</span>}
        <span className="friend-arm left"><i /></span>
        <span className="friend-arm right"><i /></span>
        <div className="friend-blob">
          <div className="friend-face">
            <span className="friend-eye left" />
            <span className="friend-eye right" />
            <span className="friend-mouth" />
          </div>
          {equipped.includes("glasses") && <i className="friend-glasses">⌐■-■</i>}
          <span className="friend-heart">♥</span>
          {equipped.includes("bow-tie") && <i className="friend-bow">◆</i>}
        </div>
      </div>
    </div>
  );
}

export default Friend;
