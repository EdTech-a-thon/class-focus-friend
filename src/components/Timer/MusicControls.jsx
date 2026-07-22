import { useState } from "react";
import LOFI_TRACKS from "../../data/lofiTracks";

const MusicControls = ({ music }) => {
  const { musicEnabled, setMusicEnabled } = music;
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(LOFI_TRACKS[0].id);
  const playlist = LOFI_TRACKS.find((item) => item.id === selectedPlaylistId) ?? LOFI_TRACKS[0];

  const toggleMusic = () => {
    setMusicEnabled((enabled) => !enabled);
  };

  return (
    <>
      <button
        className={`music-button ${musicEnabled ? "playing" : ""}`}
        type="button"
        aria-pressed={musicEnabled}
        aria-controls="spotify-playlist"
        onClick={toggleMusic}
      >
        <span aria-hidden="true">♫</span>{" "}
        {musicEnabled ? "Hide lo-fi playlist" : "Show lo-fi playlist"}
      </button>

      {musicEnabled && (
        <label className="track-control">
          <span>Choose a playlist</span>
          <select
            value={selectedPlaylistId}
            onChange={(event) => setSelectedPlaylistId(event.target.value)}
          >
            {LOFI_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                {track.title}
              </option>
            ))}
          </select>
        </label>
      )}

      {musicEnabled && (
        <div className="spotify-player" id="spotify-playlist">
          <iframe
            title={playlist.title}
            src={playlist.embedUrl}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      {musicEnabled && (
        <p className="music-note">
          This is a public Spotify playlist embed.
        </p>
      )}
    </>
  );
};

export default MusicControls;
