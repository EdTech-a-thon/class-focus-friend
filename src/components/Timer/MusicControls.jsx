import { useEffect, useRef, useState } from "react";

const LOFI_TRACKS = [
  { id: "jfKfPfyJRdk", title: "Lofi Girl: beats to relax/study to" },
  { id: "4xDzrJKXOOY", title: "Lofi Girl: synthwave radio" },
  { id: "rUxyKA_-grg", title: "Lofi Girl: sleep/chill radio" },
  { id: "Na0w3Mz46GA", title: "Lofi Girl: Asian lofi radio" },
  { id: "lTRiuFIWV54", title: "Lofi Girl: 1 A.M Study Session" },
];

const MusicControls = ({ music }) => {
  const {
    musicEnabled,
    setMusicEnabled,
    musicVolume,
    setMusicVolume,
  } = music;
  const [trackId, setTrackId] = useState(LOFI_TRACKS[0].id);
  const [playerReady, setPlayerReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const playerElement = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    let active = true;

    const createPlayer = () => {
      if (!active || player.current || !playerElement.current) return;
      player.current = new window.YT.Player(playerElement.current, {
        videoId: trackId,
        playerVars: { controls: 1, playsinline: 1, rel: 0 },
        events: {
          onReady(event) {
            event.target.setVolume(musicVolume);
            setPlayerReady(true);
          },
          onStateChange(event) {
            if (event.data === window.YT.PlayerState.PLAYING) setMusicEnabled(true);
            if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) setMusicEnabled(false);
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        createPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      active = false;
      player.current?.destroy();
      player.current = null;
    };
  }, []);

  useEffect(() => {
    if (!playerReady) return;
    if (musicEnabled) player.current.loadVideoById(trackId);
    else player.current.cueVideoById(trackId);
  }, [trackId, playerReady]);

  useEffect(() => {
    if (!playerReady) return;
    if (musicEnabled) player.current.playVideo();
    else player.current.pauseVideo();
  }, [musicEnabled, playerReady]);

  useEffect(() => {
    if (playerReady) player.current.setVolume(musicVolume);
  }, [musicVolume, playerReady]);

  const toggleMusic = () => {
    if (musicEnabled) player.current.pauseVideo();
    else player.current.playVideo();
    setMusicEnabled((enabled) => !enabled);
  }

  return (
    <>
      <button
        className={`music-button ${musicEnabled ? "playing" : ""}`}
        type="button"
        aria-pressed={musicEnabled}
        disabled={!playerReady}
        onClick={toggleMusic}
      >
        <span aria-hidden="true">♫</span>{" "}
        {musicEnabled
          ? "Lo-fi music playing"
          : playerReady ? "Play lo-fi music" : "Loading lo-fi music..."}
      </button>

      {musicEnabled && (
        <label className="track-control">
          <span>Choose a station</span>
          <select value={trackId} onChange={(event) => setTrackId(event.target.value)}>
            {LOFI_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>{track.title}</option>
            ))}
          </select>
        </label>
      )}

      {musicEnabled && (
        <button
          className="video-toggle"
          type="button"
          aria-expanded={showVideo}
          onClick={() => setShowVideo((visible) => !visible)}
        >
          {showVideo ? "Hide video" : "Show video"}
        </button>
      )}

      <div className={`youtube-player ${musicEnabled && showVideo ? "" : "hidden"}`}>
        <div ref={playerElement}>Loading music player...</div>
      </div>

      {musicEnabled && (
        <>
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
            Music is streamed from a curated YouTube station.
          </p>
        </>
      )}
    </>
  );
};

export default MusicControls;
