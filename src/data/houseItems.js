const iconSVG = (id, color = "#e98769") => {
  const groups = [
    [["leafy-plant", "herb-garden", "bathroom-plant", "office-plant"], `<path d="M60 96V45M60 65C45 62 34 51 32 36c17-1 28 8 28 23M60 53c12-15 25-19 38-14-2 17-15 27-38 28"/><path d="M37 95h46l-6 19H43z" fill="${color}"/>`],
    [["story-lamp", "moon-lamp", "desk-lamp"], `<path d="M39 64h42L70 31H50z" fill="${color}"/><path d="M60 64v35M43 103h34"/>`],
    [["family-photo", "art-wall", "wall-art"], `<rect x="23" y="25" width="74" height="68" rx="5" fill="#fffaf0"/><circle cx="73" cy="45" r="8" fill="#f8d97a"/><path d="m31 82 20-23 13 13 11-10 14 20z" fill="${color}"/>`],
    [["record-player"], `<circle cx="59" cy="66" r="30" fill="#fffaf0"/><circle cx="59" cy="66" r="15" fill="${color}"/><circle cx="59" cy="66" r="5"/><path d="M88 42v34l-12 12"/>`],
    [["tea-table", "tea-kettle"], `<path d="M38 50h38v34c0 18-38 18-38 0z" fill="${color}"/><path d="M76 59c24-2 24 25 2 24M38 60 25 69l13 7M46 43h23"/>`],
    [["fruit-bowl", "dinner-feast"], `<path d="M27 68c4 31 17 40 33 40s29-9 33-40z" fill="${color}"/><circle cx="45" cy="60" r="13" fill="#e98769"/><circle cx="64" cy="56" r="14" fill="#f8d97a"/><circle cx="77" cy="63" r="12" fill="#7ab88a"/>`],
    [["mixing-bowls", "place-settings"], `<path d="M25 57h70c-4 34-17 48-35 48S29 91 25 57z" fill="${color}"/><path d="M38 72h44M33 84h54"/>`],
    [["cookie-jar"], `<path d="M35 42h50l7 62H28z" fill="${color}"/><path d="M31 42h58M42 31h36"/><circle cx="48" cy="67" r="5"/><circle cx="70" cy="83" r="5"/><circle cx="55" cy="96" r="4"/>`],
    [["happy-toaster"], `<rect x="27" y="47" width="66" height="57" rx="14" fill="${color}"/><path d="M39 47v-9h42v9M42 65h36"/><circle cx="79" cy="87" r="4"/>`],
    [["wall-clock"], `<circle cx="60" cy="66" r="39" fill="#fffaf0"/><path d="M60 38v28l19 12M60 27v7M60 98v7M21 66h7M92 66h7"/>`],
    [["recipe-board", "wall-calendar"], `<rect x="27" y="29" width="66" height="78" rx="5" fill="#fffaf0"/><path d="M39 23v15M81 23v15M27 49h66M40 65h40M40 78h30M40 91h35"/>`],
    [["cake-stand"], `<path d="M31 64h58v22H31z" fill="${color}"/><path d="M25 88h70M60 88v17M42 108h36"/><path d="M35 64c2-18 12-27 25-27s23 9 25 27" fill="#f7c6d8"/>`],
    [["soft-towels", "wash-basket"], `<path d="M28 62h64l-8 45H36z" fill="${color}"/><path d="M40 62c0-27 40-27 40 0M42 77h36M39 90h42"/>`],
    [["round-mirror"], `<circle cx="60" cy="58" r="35" fill="#bfe3ea"/><path d="M60 93v16M43 110h34"/>`],
    [["toothbrush-cup", "skin-care"], `<path d="M38 59h44l-5 49H43z" fill="${color}"/><path d="M49 59 45 26M61 59V20M73 59l5-31"/>`],
    [["soap-set", "face-masks"], `<rect x="28" y="67" width="64" height="35" rx="17" fill="${color}"/><path d="M43 64c1-15 33-15 34 0"/><circle cx="39" cy="47" r="7" fill="#bfe3ea"/><circle cx="58" cy="35" r="10" fill="#bfe3ea"/>`],
    [["rubber-duck"], `<circle cx="73" cy="48" r="18" fill="#f8d97a"/><path d="m90 48 16 7-16 6M82 48h1"/><path d="M27 87c8-28 31-33 48-17 9 9 14 25 5 34H38c-10-2-16-8-11-17z" fill="#f8d97a"/>`],
    [["dream-mobile"], `<path d="M60 20v24M30 45h60M38 45v18M82 45v18M60 45v31"/><path d="m38 64 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="#f8d97a"/><path d="M73 72c16 0 22 20 9 29-11 8-27 0-27-14 5 4 14 4 18-1 4-4 4-9 0-14z" fill="${color}"/>`],
    [["kitchen-utensils"], `<path d="M38 24v82M27 24v27c0 15 22 15 22 0V24M71 24v82M71 24c26 8 25 38 0 43"/>`],
    [["fuzzy-robe"], `<path d="m40 28 20 12 20-12 22 22-13 15-9-8v54H40V57l-9 8-13-15z" fill="${color}"/><path d="M60 40v71M40 76h40M52 40l8 13 8-13"/>`],
    [["coffee-maker"], `<rect x="34" y="25" width="52" height="82" rx="7" fill="${color}"/><path d="M43 54h34M46 68h28v27H46zM52 107h38"/><circle cx="71" cy="40" r="5"/>`],
  ];
  const match = groups.find(([ids]) => ids.includes(id));
  const body = match?.[1] || `<path d="M60 25 70 50l27 3-20 18 6 27-23-13-23 13 6-27-20-18 27-3z" fill="${color}"/>`;
  return `<g fill="none" stroke="#29453e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
};

const cartoonItem = (id, color) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260">
    <defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#29453e" flood-opacity=".22"/></filter></defs>
    <ellipse cx="180" cy="218" rx="104" ry="18" fill="#29453e" opacity=".13"/>
    <g filter="url(#shadow)">
      <path d="M64 190c8-77 48-124 116-124s108 47 116 124c-27 22-66 34-116 34S91 212 64 190z" fill="${color}" stroke="#29453e" stroke-width="7"/>
      <g transform="translate(90 82) scale(1.5)">${iconSVG(id, color)}</g>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const roomItemSVG = (id, sceneType, color) => {
  const stroke = "#29453e";
  const sw = 4;
  const make = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">${body}</svg>`;
  const dataUri = (body) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(make(body))}`;
  const detail = `<g transform="translate(72 90) scale(.8)">${iconSVG(id, color)}</g>`;

  switch (sceneType) {
    case "furniture": {
      return dataUri(`
        <ellipse cx="120" cy="215" rx="80" ry="12" fill="#29453e" opacity=".14"/>
        <rect x="22" y="88" width="196" height="104" rx="28" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <rect x="38" y="104" width="164" height="50" rx="16" fill="#fffaf0" opacity=".45" stroke="${stroke}" stroke-width="2.5"/>
        <line x1="60" y1="129" x2="180" y2="129" stroke="${stroke}" stroke-width="2.5" opacity=".35"/>
        <line x1="60" y1="142" x2="160" y2="142" stroke="${stroke}" stroke-width="2.5" opacity=".35"/>
        <rect x="28" y="192" width="16" height="20" rx="6" fill="#735342"/>
        <rect x="196" y="192" width="16" height="20" rx="6" fill="#735342"/>
      `);
    }
    case "lamp": {
      return dataUri(`
        <ellipse cx="120" cy="215" rx="42" ry="8" fill="#29453e" opacity=".14"/>
        <rect x="110" y="160" width="20" height="48" rx="5" fill="#735342"/>
        <path d="M40 165 Q40 70 120 70 Q200 70 200 165 Z" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <ellipse cx="120" cy="76" rx="18" ry="10" fill="#fffaf0" opacity=".4"/>
        <path d="M85 165 L155 165" stroke="${stroke}" stroke-width="3"/>
      `);
    }
    case "plant": {
      return dataUri(`
        <ellipse cx="120" cy="215" rx="38" ry="9" fill="#29453e" opacity=".14"/>
        <rect x="92" y="185" width="56" height="50" rx="8" fill="#c86e54" stroke="${stroke}" stroke-width="${sw}"/>
        <path d="M120 185 Q95 120 55 95" fill="none" stroke="#59806b" stroke-width="6" stroke-linecap="round"/>
        <path d="M120 185 Q145 115 185 90" fill="none" stroke="#59806b" stroke-width="6" stroke-linecap="round"/>
        <path d="M120 185 Q120 100 120 60" fill="none" stroke="#59806b" stroke-width="6" stroke-linecap="round"/>
        <circle cx="55" cy="92" r="14" fill="#7ab88a"/>
        <circle cx="185" cy="87" r="14" fill="#7ab88a"/>
        <circle cx="120" cy="56" r="16" fill="#7ab88a"/>
      `);
    }
    case "rug": {
      return dataUri(`
        <ellipse cx="120" cy="210" rx="105" ry="22" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <ellipse cx="120" cy="210" rx="75" ry="15" fill="none" stroke="#fffaf0" stroke-width="2" opacity=".4"/>
        <ellipse cx="120" cy="210" rx="45" ry="9" fill="none" stroke="#fffaf0" stroke-width="2" opacity=".4"/>
      `);
    }
    case "curtain": {
      return dataUri(`
        <rect x="20" y="20" width="10" height="200" rx="5" fill="#735342"/>
        <path d="M30 25 Q75 40 80 100 Q85 60 130 100 Q135 60 180 100 Q185 40 220 25 L220 200 Q190 180 140 195 Q90 210 40 195 Z" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <path d="M70 40 Q72 120 68 190" fill="none" stroke="${stroke}" stroke-width="2" opacity=".3"/>
        <path d="M150 40 Q152 120 148 190" fill="none" stroke="${stroke}" stroke-width="2" opacity=".3"/>
      `);
    }
    case "wall": {
      return dataUri(`
        <rect x="30" y="25" width="180" height="140" rx="8" fill="#fff5dc" stroke="${stroke}" stroke-width="7"/>
        <rect x="44" y="39" width="152" height="112" rx="4" fill="${color}" opacity=".5"/>
        <g transform="translate(72 42) scale(.8)">${iconSVG(id, color)}</g>
      `);
    }
    case "soft": {
      return dataUri(`
        <ellipse cx="120" cy="185" rx="40" ry="16" fill="#29453e" opacity=".13"/>
        <ellipse cx="120" cy="160" rx="95" ry="58" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <ellipse cx="120" cy="140" rx="68" ry="32" fill="#fffaf0" opacity=".3"/>
      `);
    }
    case "table": {
      return dataUri(`
        <ellipse cx="120" cy="210" rx="58" ry="12" fill="#29453e" opacity=".14"/>
        <rect x="100" y="150" width="40" height="52" rx="6" fill="#735342"/>
        <ellipse cx="120" cy="150" rx="75" ry="24" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        <ellipse cx="120" cy="145" rx="65" ry="18" fill="#fffaf0" opacity=".25"/>
        ${detail}
      `);
    }
    case "surface": {
      return dataUri(`
        <ellipse cx="120" cy="210" rx="35" ry="9" fill="#29453e" opacity=".14"/>
        <rect x="74" y="148" width="92" height="56" rx="10" fill="#f4eee3" stroke="${stroke}" stroke-width="${sw}"/>
        <rect x="82" y="156" width="76" height="40" rx="6" fill="${color}" opacity=".5"/>
        ${detail}
      `);
    }
    case "hanging": {
      return dataUri(`
        <rect x="116" y="5" width="8" height="30" rx="4" fill="#735342"/>
        <line x1="120" y1="35" x2="120" y2="55" stroke="#735342" stroke-width="3"/>
        <ellipse cx="120" cy="85" rx="14" ry="10" fill="#fffaf0" opacity=".4"/>
        <ellipse cx="120" cy="135" rx="55" ry="65" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        ${detail}
      `);
    }
    default: {
      return dataUri(`
        <ellipse cx="120" cy="210" rx="52" ry="12" fill="#29453e" opacity=".14"/>
        <rect x="50" y="130" width="140" height="72" rx="16" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
        ${detail}
      `);
    }
  }
}

const cartoonRoom = (name, symbol, wall, floor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 540">
    <rect width="900" height="540" fill="${wall}"/>
    <path d="M0 360h900v180H0z" fill="${floor}"/>
    <path d="M0 360h900" stroke="#735342" stroke-width="12"/>
    <rect x="105" y="84" width="190" height="190" rx="18" fill="#c4e4ed" stroke="#29453e" stroke-width="12"/>
    <path d="M200 84v190M105 180h190" stroke="#29453e" stroke-width="10"/>
    <circle cx="608" cy="118" r="48" fill="#ffe486"/>
    <path d="M525 358c0-116 74-176 170-176s170 60 170 176" fill="#f7f1e5" stroke="#29453e" stroke-width="12"/>
    <rect x="570" y="279" width="250" height="85" rx="28" fill="#e98769" stroke="#29453e" stroke-width="12"/>
    <circle cx="650" cy="320" r="18" fill="#f8d97a"/><circle cx="744" cy="320" r="18" fill="#f8d97a"/>
    <text x="450" y="447" text-anchor="middle" font-family="Arial, sans-serif" font-size="106" font-weight="bold" fill="#29453e">${symbol}</text>
    <text x="450" y="505" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#29453e">${name}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const roomPriceCounts = {};
const nextRoomPrice = (room) => {
  const pricePosition = roomPriceCounts[room] || 0;
  roomPriceCounts[room] = pricePosition + 1;
  return 30 + pricePosition * 5;
};

const item = (id, name, _cost, room, symbol, color, sceneType = "floor", roomPosition = {}) => ({
  id,
  name,
  cost: nextRoomPrice(room),
  room,
  symbol,
  sceneType,
  image: cartoonItem(id, color),
  roomImage: roomItemSVG(id, sceneType, color),
  roomPosition,
});

export const houseItems = [
  item("sunny-sofa", "Sunny Sofa", 15, "living", "🛋️", "#efac64", "furniture", { x: 2, y: 12, w: 28, anchor: "bottom" }),
  item("story-lamp", "Story Lamp", 20, "living", "💡", "#e98769", "lamp", { x: 85, y: 10, w: 11, anchor: "bottom" }),
  item("leafy-plant", "Leafy Plant", 25, "living", "🪴", "#83b68b", "plant", { x: 31, y: 10, w: 10, anchor: "bottom" }),
  item("rainbow-rug", "Rainbow Rug", 30, "living", "🌈", "#d88cbe", "rug", { x: 22, y: 2, w: 36, anchor: "bottom" }),
  item("book-nook", "Book Nook", 35, "living", "📚", "#7198d2", "furniture", { x: 52, y: 11, w: 20, anchor: "bottom" }),
  item("window-curtains", "Window Curtains", 40, "living", "🪟", "#ae92c4", "curtain", { x: 73, y: 12, w: 14, anchor: "top" }),
  item("cloud-pillows", "Cloud Pillows", 45, "living", "☁️", "#98c4d8", "soft", { x: 72, y: 8, w: 12, anchor: "bottom" }),
  item("family-photo", "Friendship Frame", 50, "living", "🖼️", "#f0b867", "wall", { x: 1, y: 20, w: 16, anchor: "top" }),
  item("record-player", "Record Player", 55, "living", "🎵", "#6fa89a", "surface", { x: 40, y: 10, w: 10, anchor: "bottom" }),
  item("tea-table", "Little Tea Table", 60, "living", "🫖", "#d98573", "table", { x: 64, y: 10, w: 14, anchor: "bottom" }),

  item("cozy-bed", "Cozy Bed", 65, "bedroom", "🛏️", "#8aa5d1", "furniture", { x: 40, y: 12, w: 32, anchor: "bottom" }),
  item("star-rug", "Star Rug", 70, "bedroom", "⭐", "#e9bd62", "rug", { x: 32, y: 2, w: 28, anchor: "bottom" }),
  item("nightstand", "Nightstand", 75, "bedroom", "🗄️", "#cf9668", "furniture", { x: 1, y: 13, w: 16, anchor: "bottom" }),
  item("moon-lamp", "Moon Lamp", 80, "bedroom", "🌙", "#8d83bd", "lamp", { x: 4, y: 10, w: 13, anchor: "bottom" }),
  item("soft-blanket", "Soft Blanket", 85, "bedroom", "🧣", "#df92a4", "soft", { x: 72, y: 20, w: 13, anchor: "bottom" }),
  item("dream-mobile", "Dream Mobile", 90, "bedroom", "💫", "#75afbc", "hanging", { x: 44, y: 4, w: 12, anchor: "top" }),
  item("art-wall", "Art Wall", 95, "bedroom", "🎨", "#e58969", "wall", { x: 0, y: 24, w: 15, anchor: "top" }),
  item("comfy-chair", "Comfy Chair", 100, "bedroom", "🪑", "#8eb179", "furniture", { x: 74, y: 12, w: 16, anchor: "bottom" }),
  item("toy-basket", "Toy Basket", 105, "bedroom", "🧸", "#f0b95f", "floor", { x: 5, y: 15, w: 12, anchor: "bottom" }),
  item("closet", "Colorful Closet", 110, "bedroom", "🚪", "#bd91c6", "furniture", { x: 20, y: 12, w: 18, anchor: "bottom" }),

  item("fruit-bowl", "Fruit Bowl", 115, "kitchen", "🍎", "#e88b64", "surface", { x: 2, y: 36, w: 9, anchor: "bottom" }),
  item("tea-kettle", "Tea Kettle", 120, "kitchen", "🫖", "#6fa7b0", "surface", { x: 12, y: 36, w: 9, anchor: "bottom" }),
  item("mixing-bowls", "Mixing Bowls", 125, "kitchen", "🥣", "#d18fbd", "surface", { x: 22, y: 36, w: 9, anchor: "bottom" }),
  item("cookie-jar", "Cookie Jar", 130, "kitchen", "🍪", "#d3a066", "surface", { x: 32, y: 36, w: 9, anchor: "bottom" }),
  item("sunny-table", "Sunny Table", 135, "kitchen", "🍽️", "#eeaf5e", "table", { x: 42, y: 12, w: 18, anchor: "bottom" }),
  item("wall-clock", "Wall Clock", 140, "kitchen", "🕰️", "#87aa81", "wall", { x: 58, y: 14, w: 13, anchor: "top" }),
  item("herb-garden", "Herb Garden", 145, "kitchen", "🌿", "#75aa7d", "surface", { x: 63, y: 36, w: 9, anchor: "bottom" }),
  item("recipe-board", "Recipe Board", 150, "kitchen", "📝", "#e58369", "wall", { x: 72, y: 14, w: 13, anchor: "top" }),
  item("happy-toaster", "Happy Toaster", 155, "kitchen", "🍞", "#7198d2", "surface", { x: 85, y: 36, w: 9, anchor: "bottom" }),
  item("cake-stand", "Cake Stand", 160, "kitchen", "🍰", "#d97dac", "surface", { x: 0, y: 21, w: 10, anchor: "bottom" }),
  item("dining-table", "Dining Table", 165, "kitchen", "🍽️", "#b9825d", "table", { x: 24, y: 16, w: 24, anchor: "bottom" }),
  item("place-settings", "Place Settings", 170, "kitchen", "🍴", "#87aeb8", "surface", { x: 10, y: 21, w: 9, anchor: "bottom" }),
  item("kitchen-utensils", "Kitchen Utensils", 175, "kitchen", "🥄", "#d3a066", "wall", { x: 52, y: 20, w: 12, anchor: "top" }),
  item("dinner-feast", "Dinner Feast", 180, "kitchen", "🥘", "#d9795f", "surface", { x: 58, y: 12, w: 12, anchor: "bottom" }),

  item("bubble-bath", "Bubble Bath", 215, "bathroom", "🛁", "#88bbd5", "furniture", { x: 40, y: 13, w: 26, anchor: "bottom" }),
  item("soft-towels", "Soft Towels", 220, "bathroom", "🧺", "#d59aae", "wall", { x: 1, y: 18, w: 14, anchor: "top" }),
  item("round-mirror", "Round Mirror", 225, "bathroom", "🪞", "#82b8b3", "wall", { x: 0, y: 12, w: 14, anchor: "top" }),
  item("toothbrush-cup", "Toothbrush Cup", 230, "bathroom", "🪥", "#e3a15f", "surface", { x: 0, y: 38, w: 9, anchor: "bottom" }),
  item("bath-mat", "Bath Mat", 235, "bathroom", "▰", "#9b91c5", "rug", { x: 32, y: 2, w: 28, anchor: "bottom" }),
  item("soap-set", "Sweet Soap Set", 240, "bathroom", "🧼", "#7aaf8e", "surface", { x: 10, y: 38, w: 9, anchor: "bottom" }),
  item("wash-basket", "Wash Basket", 245, "bathroom", "🧺", "#d28877", "floor", { x: 2, y: 15, w: 11, anchor: "bottom" }),
  item("shower-curtain", "Shower Curtain", 250, "bathroom", "🚿", "#80abc7", "curtain", { x: 73, y: 10, w: 14, anchor: "top" }),
  item("rubber-duck", "Rubber Duck", 255, "bathroom", "🦆", "#edbb59", "surface", { x: 65, y: 22, w: 10, anchor: "bottom" }),
  item("bathroom-plant", "Bathroom Plant", 260, "bathroom", "🪴", "#83b68b", "plant", { x: 2, y: 10, w: 11, anchor: "bottom" }),
  item("face-masks", "Face Masks", 265, "bathroom", "🧖", "#a3c9ae", "surface", { x: 76, y: 38, w: 9, anchor: "bottom" }),
  item("skin-care", "Skin Care Set", 270, "bathroom", "🧴", "#dfa0ae", "surface", { x: 86, y: 38, w: 9, anchor: "bottom" }),
  item("fuzzy-robe", "Fuzzy Robe", 325, "bathroom", "🥋", "#b9a5cb", "hanging", { x: 16, y: 4, w: 12, anchor: "top" }),

  item("office-desk", "Focus Desk", 275, "office", "🖥️", "#b9825d", "furniture", { x: 30, y: 12, w: 26, anchor: "bottom" }),
  item("desk-chair", "Desk Chair", 280, "office", "🪑", "#7198d2", "furniture", { x: 12, y: 12, w: 16, anchor: "bottom" }),
  item("bookcase", "Bookcase", 285, "office", "📚", "#d3a066", "furniture", { x: 74, y: 11, w: 16, anchor: "bottom" }),
  item("desk-lamp", "Desk Lamp", 290, "office", "💡", "#e9bd62", "lamp", { x: 2, y: 10, w: 12, anchor: "bottom" }),
  item("office-plant", "Office Plant", 295, "office", "🪴", "#83b68b", "plant", { x: 60, y: 10, w: 10, anchor: "bottom" }),
  item("wall-calendar", "Wall Calendar", 300, "office", "📅", "#e58369", "wall", { x: 40, y: 8, w: 12, anchor: "top" }),
  item("filing-cabinet", "Filing Cabinet", 305, "office", "🗄️", "#8d83bd", "furniture", { x: 78, y: 12, w: 14, anchor: "bottom" }),
  item("work-rug", "Work Rug", 310, "office", "▰", "#d88cbe", "rug", { x: 30, y: 2, w: 26, anchor: "bottom" }),
  item("wall-art", "Wall Art", 315, "office", "🖼️", "#f0b867", "wall", { x: 56, y: 8, w: 12, anchor: "top" }),
  item("coffee-maker", "Coffee Maker", 320, "office", "☕", "#6fa7b0", "surface", { x: 0, y: 36, w: 10, anchor: "bottom" }),
];

export const classMilestones = [
  {
    id: "plant-corner",
    name: "Sunny Plant Corner",
    icon: "🌱",
    room: "living",
    itemIds: ["leafy-plant", "window-curtains", "rainbow-rug"],
  },
  {
    id: "reading-nook",
    name: "Cozy Reading Nook",
    icon: "📚",
    room: "living",
    itemIds: ["book-nook", "story-lamp", "cloud-pillows"],
  },
  {
    id: "celebration-space",
    name: "Class Celebration Space",
    icon: "🎉",
    room: "living",
    itemIds: ["record-player", "tea-table", "family-photo"],
  },
  {
    id: "sweet-dreams",
    name: "Sweet Dreams Setup",
    icon: "🌙",
    room: "bedroom",
    itemIds: ["cozy-bed", "soft-blanket", "moon-lamp"],
  },
  {
    id: "stargazing-corner",
    name: "Stargazing Corner",
    icon: "⭐",
    room: "bedroom",
    itemIds: ["star-rug", "dream-mobile", "comfy-chair"],
  },
  {
    id: "creative-sleepover",
    name: "Creative Sleepover",
    icon: "🎨",
    room: "bedroom",
    itemIds: ["art-wall", "toy-basket", "closet"],
  },
  {
    id: "cheerful-breakfast",
    name: "Cheerful Breakfast",
    icon: "🍞",
    room: "kitchen",
    itemIds: ["sunny-table", "fruit-bowl", "happy-toaster"],
  },
  {
    id: "class-dinner",
    name: "Host a Class Dinner",
    icon: "🍽️",
    room: "kitchen",
    itemIds: ["dining-table", "place-settings", "kitchen-utensils", "dinner-feast"],
  },
  {
    id: "class-bake-off",
    name: "Class Bake-Off",
    icon: "🍰",
    room: "kitchen",
    itemIds: ["mixing-bowls", "cookie-jar", "recipe-board", "cake-stand"],
  },
  {
    id: "fresh-and-ready",
    name: "Fresh and Ready",
    icon: "🫧",
    room: "bathroom",
    itemIds: ["soft-towels", "round-mirror", "soap-set"],
  },
  {
    id: "spa-day",
    name: "Spa Day",
    icon: "🧖",
    room: "bathroom",
    itemIds: ["face-masks", "skin-care", "fuzzy-robe", "bubble-bath"],
  },
  {
    id: "garden-bath",
    name: "Calm Garden Bath",
    icon: "🌿",
    room: "bathroom",
    itemIds: ["bathroom-plant", "bath-mat", "shower-curtain", "rubber-duck"],
  },
];

export const houseRooms = [
  { id: "living", name: "Living Room", icon: "⌂", description: "A sunny place to focus together.", sessionsRequired: 0, image: cartoonRoom("Living Room", "HOME", "#d9e9db", "#caa27a") },
  { id: "bedroom", name: "Bedroom", icon: "☾", description: "A quiet space for cozy dreams.", sessionsRequired: 25, image: cartoonRoom("Bedroom", "DREAM", "#ded8ee", "#b89072") },
  { id: "kitchen", name: "Kitchen", icon: "♨", description: "A cheerful spot for snacks.", sessionsRequired: 50, image: cartoonRoom("Kitchen", "YUM", "#f6ddad", "#c99d75") },
  { id: "bathroom", name: "Bathroom", icon: "◌", description: "A fresh space to get ready.", sessionsRequired: 75, image: cartoonRoom("Bathroom", "SPLASH", "#d1e9ed", "#b58d6d") },
  { id: "office", name: "Office", icon: "▣", description: "A bright space for big ideas.", sessionsRequired: 100, image: cartoonRoom("Office", "FOCUS", "#e9e2d3", "#a88161") },
];
