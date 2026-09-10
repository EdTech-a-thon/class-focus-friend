// Built-in surfaces share the room's coordinates, so rewards stay on their tops.
const RoomFixtures = ({ room }) => {
  if (room !== 'kitchen' && room !== 'bathroom') return null;
  return (
    <svg className="room-fixtures" viewBox="0 0 900 440" aria-hidden="true">
      <g stroke="#536b60" strokeWidth="2" strokeLinejoin="round">
        {room === 'kitchen' ? <>
          <path d="M40 192h355v48H40zM565 192h300v48H565z" fill="#e2e9dd" stroke="none" />
          <path d="M40 215h355m-300-23v48m60-48v48m60-48v48m60-48v48m60-48v48M565 215h300m-240-23v48m60-48v48m60-48v48m60-48v48" stroke="#fffaf0" />
          <rect x="43" y="247" width="349" height="88" rx="3" fill="#9bb5a0" />
          <rect x="568" y="247" width="294" height="88" rx="3" fill="#9bb5a0" />
          <path d="M47 332h341m184 0h286" stroke="#718c78" strokeWidth="7" />
          <path d="M55 258h99v62H55zM166 258h99v62h-99zM580 258h131v62H580zM724 258h126v62H724z" fill="#adc5ad" />
          <path d="M128 275h13m39 0h13m488 0h15m43 0h15" stroke="#536b60" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 232h355v16H40zM565 232h300v16H565z" fill="#fdf4df" />
          <rect x="277" y="248" width="104" height="79" rx="3" fill="#ece6d9" />
          <rect x="289" y="272" width="80" height="42" rx="6" fill="#526c67" />
          <path d="M298 280h62" stroke="#b7ccbf" strokeWidth="4" />
          <circle cx="296" cy="260" r="3" fill="#536b60" /><circle cx="316" cy="260" r="3" fill="#536b60" /><circle cx="356" cy="260" r="3" fill="#536b60" />
          <ellipse cx="305" cy="239" rx="17" ry="4" fill="#536b60" /><ellipse cx="355" cy="239" rx="17" ry="4" fill="#536b60" />
          <ellipse cx="688" cy="239" rx="47" ry="8" fill="#8dafa9" /><ellipse cx="688" cy="237" rx="33" ry="4" fill="#bad6ce" />
          <path d="M711 236v-25q0-18-18-18t-18 18" fill="none" stroke="#6b8b84" strokeWidth="5" />
          <path d="M51 150h179v7H51z" fill="#b9825d" /><path d="M65 157v10m148-10v10" stroke="#b9825d" strokeWidth="5" />
        </> : <>
          <path d="M57 253h207v94H57z" fill="#8bb7ac" />
          <path d="m264 253 18-15v95l-18 14z" fill="#6c9b91" />
          <path d="M67 268h88v66H67zM166 268h88v66h-88z" fill="#a4c9bc" />
          <path d="M139 285v15m43-15v15" stroke="#536b60" strokeWidth="4" strokeLinecap="round" />
          <path d="m49 246 20-23h216l-17 23z" fill="#fff9e9" />
          <path d="M49 246h219v13H49z" fill="#e9e7d7" /><path d="m268 246 17-23v14l-17 22z" fill="#c7d6cc" />
          <ellipse cx="164" cy="239" rx="56" ry="12" fill="#739f9e" />
          <ellipse cx="164" cy="236" rx="44" ry="7" fill="#c6e2da" />
          <path d="M186 229v-23q0-14-15-14t-15 14" fill="none" stroke="#6f8c87" strokeWidth="5" />
          <path d="M81 351v7m160-7v7" stroke="#536b60" strokeWidth="6" />
          <path d="M461 174h123v7H461z" fill="#b9825d" /><path d="M473 181v9m99-9v9" stroke="#b9825d" strokeWidth="4" />
        </>}
      </g>
    </svg>
  );
};

export default RoomFixtures;
