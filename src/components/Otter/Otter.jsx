const Otter = ({ equipped, isCelebrating, isFocusing, noiseTone }) => {
  const isLoud = noiseTone === "loud";
  const state = isCelebrating ? "celebrating" : isLoud ? "loud" : isFocusing ? "focusing" : "idle";
  const messages = {
    celebrating: "We did it!",
    focusing: "In the zone...",
    idle: "Ready when you are!",
    loud: "A little quieter, please!",
  };

  return (
    <div className={`otter-scene state-${state}`}>
      <p className="otter-message" aria-live="polite">{messages[state]}</p>
      <span className="sparkle one" aria-hidden="true">✦</span>
      <span className="sparkle two" aria-hidden="true">✦</span>
      <div className="otter" role="img" aria-label={`Otter is ${state}`}>
        <svg className="otter-svg" viewBox="0 0 220 220" aria-hidden="true">
          <path className="otter-tail" d="M152 156 C181 172 205 159 208 135 C210 122 201 114 193 118 C186 122 192 133 184 141 C175 150 161 148 150 142Z" />
          <g className="otter-leg otter-leg-left">
            <path d="M82 169 C78 185 75 195 68 204" />
            <path d="M68 204 C61 204 57 207 55 211" />
          </g>
          <g className="otter-leg otter-leg-right">
            <path d="M143 170 C146 187 151 197 158 205" />
            <path d="M158 205 C165 204 170 207 172 211" />
          </g>
          <g className="otter-ear otter-ear-left"><circle cx="59" cy="45" r="17" /></g>
          <g className="otter-ear otter-ear-right"><circle cx="161" cy="45" r="17" /></g>
          <path className="otter-blob" d="M110 24 C77 24 47 47 43 85 C40 107 50 128 62 138 C48 148 43 166 51 180 C62 196 158 196 169 180 C177 166 172 148 158 138 C170 128 180 107 177 85 C173 47 143 24 110 24Z" />
          <ellipse className="otter-belly" cx="110" cy="158" rx="43" ry="32" />
          <circle className="otter-ear-inner" cx="59" cy="45" r="8" />
          <circle className="otter-ear-inner" cx="161" cy="45" r="8" />
          <g className="otter-arm otter-arm-left">
            <path d="M50 110 C34 121 28 135 30 147" />
            <path d="M30 147 C24 150 21 155 21 160" />
          </g>
          <g className="otter-arm otter-arm-right">
            <path d="M170 110 C186 121 192 135 190 147" />
            <path d="M190 147 C196 150 199 155 199 160" />
          </g>
          <g className="otter-face">
            <ellipse className="otter-muzzle" cx="110" cy="120" rx="31" ry="22" />
            <path className="otter-whiskers" d="M82 116 L57 109 M82 124 L57 126 M138 116 L163 109 M138 124 L163 126" />
            <g className="otter-eye otter-eye-left"><ellipse cx="86" cy="91" rx="7" ry="10" /><circle cx="84" cy="88" r="2" /></g>
            <g className="otter-eye otter-eye-right"><ellipse cx="137" cy="89" rx="7" ry="10" /><circle cx="135" cy="86" r="2" /></g>
            <path className="otter-nose" d="M110 100 C119 100 123 104 120 109 C117 114 113 116 110 116 C107 116 103 114 100 109 C97 104 101 100 110 100Z" />
            <path className="otter-mouth otter-mouth-smile" d="M110 116 L110 121 M110 121 C107 130 97 130 94 122 M110 121 C113 130 123 130 126 122" />
            <path className="otter-mouth otter-mouth-focus" d="M110 116 L110 122 M99 124 C104 121 116 121 121 124" />
            <ellipse className="otter-mouth otter-mouth-loud" cx="110" cy="130" rx="10" ry="10" />
            <path className="otter-mouth otter-mouth-celebrate" d="M92 120 C99 143 121 143 128 118 C116 125 104 125 92 120Z" />
          </g>
          <path className="otter-heart" transform="translate(5 5)" d="M105 153 C98 145 86 153 105 169 C124 151 112 145 105 153Z" />
          {equipped.includes("glasses") && (
            <g className="otter-glasses">
              <rect x="72" y="78" width="31" height="24" rx="10" />
              <rect x="121" y="76" width="31" height="24" rx="10" />
              <path d="M103 87 C109 84 115 84 121 86 M72 86 L60 82 M152 84 L163 79" />
              <path className="glasses-shine" d="m78 83 8 14m5-14 7 12m36-14 8 14" />
            </g>
          )}
          {equipped.includes("party-hat") && (
            <g className="otter-hat" transform="translate(-6 0)">
              <path d="M88 39 L123 3 L144 47Z" />
              <path d="M101 26 L132 34 M113 14 L138 42" />
              <circle className="hat-dot" cx="118" cy="31" r="3" />
              <circle cx="123" cy="4" r="6" />
            </g>
          )}
          {equipped.includes("bow-tie") && (
            <g className="otter-bow" transform="translate(5 -24)">
              <path d="M105 162C88 148 72 147 70 157v14c5 10 21 4 35-9 14 13 30 19 35 9v-14c-2-10-18-9-35 5Z" />
              <circle cx="105" cy="162" r="8" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export default Otter;
