function cartoonItem(label, symbol, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260">
    <defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#29453e" flood-opacity=".22"/></filter></defs>
    <ellipse cx="180" cy="218" rx="104" ry="18" fill="#29453e" opacity=".13"/>
    <g filter="url(#shadow)">
      <path d="M64 190c8-77 48-124 116-124s108 47 116 124c-27 22-66 34-116 34S91 212 64 190z" fill="${color}" stroke="#29453e" stroke-width="7"/>
      <text x="180" y="179" text-anchor="middle" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" font-size="104">${symbol}</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function cartoonRoom(name, symbol, wall, floor) {
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

const item = (id, name, cost, room, symbol, color) => ({ id, name, cost, room, image: cartoonItem(name, symbol, color) });

export const houseItems = [
  item("sunny-sofa", "Sunny Sofa", 25, "living", "🛋️", "#efac64"),
  item("story-lamp", "Story Lamp", 15, "living", "💡", "#e98769"),
  item("leafy-plant", "Leafy Plant", 15, "living", "🪴", "#83b68b"),
  item("rainbow-rug", "Rainbow Rug", 20, "living", "🌈", "#d88cbe"),
  item("book-nook", "Book Nook", 30, "living", "📚", "#7198d2"),
  item("window-curtains", "Window Curtains", 20, "living", "🪟", "#ae92c4"),
  item("cloud-pillows", "Cloud Pillows", 15, "living", "☁️", "#98c4d8"),
  item("family-photo", "Friendship Frame", 10, "living", "🖼️", "#f0b867"),
  item("record-player", "Record Player", 30, "living", "🎵", "#6fa89a"),
  item("tea-table", "Little Tea Table", 20, "living", "🫖", "#d98573"),

  item("cozy-bed", "Cozy Bed", 30, "bedroom", "🛏️", "#8aa5d1"),
  item("star-rug", "Star Rug", 15, "bedroom", "⭐", "#e9bd62"),
  item("nightstand", "Nightstand", 15, "bedroom", "🗄️", "#cf9668"),
  item("moon-lamp", "Moon Lamp", 20, "bedroom", "🌙", "#8d83bd"),
  item("soft-blanket", "Soft Blanket", 15, "bedroom", "🧣", "#df92a4"),
  item("dream-mobile", "Dream Mobile", 20, "bedroom", "💫", "#75afbc"),
  item("art-wall", "Art Wall", 25, "bedroom", "🎨", "#e58969"),
  item("comfy-chair", "Comfy Chair", 25, "bedroom", "🪑", "#8eb179"),
  item("toy-basket", "Toy Basket", 10, "bedroom", "🧸", "#f0b95f"),
  item("closet", "Colorful Closet", 30, "bedroom", "🚪", "#bd91c6"),

  item("fruit-bowl", "Fruit Bowl", 10, "kitchen", "🍎", "#e88b64"),
  item("tea-kettle", "Tea Kettle", 20, "kitchen", "🫖", "#6fa7b0"),
  item("mixing-bowls", "Mixing Bowls", 15, "kitchen", "🥣", "#d18fbd"),
  item("cookie-jar", "Cookie Jar", 15, "kitchen", "🍪", "#d3a066"),
  item("sunny-table", "Sunny Table", 30, "kitchen", "🍽️", "#eeaf5e"),
  item("wall-clock", "Wall Clock", 15, "kitchen", "🕰️", "#87aa81"),
  item("herb-garden", "Herb Garden", 20, "kitchen", "🌿", "#75aa7d"),
  item("recipe-board", "Recipe Board", 10, "kitchen", "📝", "#e58369"),
  item("happy-toaster", "Happy Toaster", 20, "kitchen", "🍞", "#7198d2"),
  item("cake-stand", "Cake Stand", 25, "kitchen", "🍰", "#d97dac"),
  item("dining-table", "Dining Table", 35, "kitchen", "🍽️", "#b9825d"),
  item("place-settings", "Place Settings", 20, "kitchen", "🍴", "#87aeb8"),
  item("kitchen-utensils", "Kitchen Utensils", 15, "kitchen", "🥄", "#d3a066"),
  item("dinner-feast", "Dinner Feast", 30, "kitchen", "🥘", "#d9795f"),

  item("bubble-bath", "Bubble Bath", 15, "bathroom", "🛁", "#88bbd5"),
  item("soft-towels", "Soft Towels", 10, "bathroom", "🧺", "#d59aae"),
  item("round-mirror", "Round Mirror", 20, "bathroom", "🪞", "#82b8b3"),
  item("toothbrush-cup", "Toothbrush Cup", 10, "bathroom", "🪥", "#e3a15f"),
  item("bath-mat", "Bath Mat", 15, "bathroom", "▰", "#9b91c5"),
  item("soap-set", "Sweet Soap Set", 15, "bathroom", "🧼", "#7aaf8e"),
  item("wash-basket", "Wash Basket", 20, "bathroom", "🧺", "#d28877"),
  item("shower-curtain", "Shower Curtain", 25, "bathroom", "🚿", "#80abc7"),
  item("rubber-duck", "Rubber Duck", 10, "bathroom", "🦆", "#edbb59"),
  item("bathroom-plant", "Bathroom Plant", 15, "bathroom", "🪴", "#83b68b"),
  item("face-masks", "Face Masks", 15, "bathroom", "🧖", "#a3c9ae"),
  item("skin-care", "Skin Care Set", 20, "bathroom", "🧴", "#dfa0ae"),
  item("fuzzy-robe", "Fuzzy Robe", 25, "bathroom", "🥋", "#b9a5cb"),
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
  { id: "bedroom", name: "Bedroom", icon: "☾", description: "A quiet space for cozy dreams.", sessionsRequired: 3, image: cartoonRoom("Bedroom", "DREAM", "#ded8ee", "#b89072") },
  { id: "kitchen", name: "Kitchen", icon: "♨", description: "A cheerful spot for snacks.", sessionsRequired: 6, image: cartoonRoom("Kitchen", "YUM", "#f6ddad", "#c99d75") },
  { id: "bathroom", name: "Bathroom", icon: "◌", description: "A fresh space to get ready.", sessionsRequired: 10, image: cartoonRoom("Bathroom", "SPLASH", "#d1e9ed", "#b58d6d") },
];
