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
        <svg className="friend-svg" viewBox="0 0 220 220" aria-hidden="true">
          <g className="friend-leg friend-leg-left">
            <path d="M82 169 C78 185 75 195 68 204" />
            <path d="M68 204 C61 204 57 207 55 211" />
          </g>
          <g className="friend-leg friend-leg-right">
            <path d="M143 170 C146 187 151 197 158 205" />
            <path d="M158 205 C165 204 170 207 172 211" />
          </g>
          <path className="friend-blob" d="M43 119 C37 82 54 45 87 33 C119 21 165 36 177 69 C189 104 181 153 150 174 C122 193 77 187 55 163 C45 151 40 136 43 119Z" />
          <path className="friend-shine" d="M72 58 C62 67 58 79 58 91" />
          <g className="friend-arm friend-arm-left">
            <path d="M58 94 C37 103 28 123 27 145" />
            <circle cx="27" cy="149" r="6" />
          </g>
          <g className="friend-arm friend-arm-right">
            <path d="M163 93 C184 100 194 119 194 141" />
            <circle cx="194" cy="145" r="6" />
          </g>
          <g className="friend-face">
            <g className="friend-eye friend-eye-left"><ellipse cx="86" cy="91" rx="7" ry="10" /><circle cx="84" cy="88" r="2" /></g>
            <g className="friend-eye friend-eye-right"><ellipse cx="137" cy="89" rx="7" ry="10" /><circle cx="135" cy="86" r="2" /></g>
            <path className="friend-mouth friend-mouth-smile" d="M94 117 C103 130 121 130 130 115" />
            <path className="friend-mouth friend-mouth-focus" d="M102 121 C110 118 117 118 124 120" />
            <ellipse className="friend-mouth friend-mouth-loud" cx="112" cy="121" rx="10" ry="13" />
            <path className="friend-mouth friend-mouth-celebrate" d="M93 115 C102 143 124 141 133 112 C120 119 106 120 93 115Z" />
          </g>
          <path className="friend-heart" d="M105 153 C98 145 86 153 105 169 C124 151 112 145 105 153Z" />
          {equipped.includes("glasses") && (
            <g className="friend-glasses">
              <rect x="72" y="78" width="31" height="24" rx="8" />
              <rect x="121" y="76" width="31" height="24" rx="8" />
              <path d="M103 87 C109 84 115 84 121 86 M72 86 L60 82 M152 84 L163 79" />
            </g>
          )}
          {equipped.includes("party-hat") && (
            <g className="friend-hat">
              <path d="M88 39 L123 3 L144 47Z" />
              <path d="M101 26 L132 34 M113 14 L138 42" />
              <circle cx="123" cy="4" r="6" />
            </g>
          )}
          {equipped.includes("bow-tie") && (
            <g className="friend-bow">
              <path d="M83 157 C70 146 65 158 70 174 C76 180 89 170 105 162 C121 175 133 179 140 171 C144 154 132 147 105 162Z" />
              <circle cx="105" cy="162" r="8" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default Friend;
