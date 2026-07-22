const cartoonItem = (label, symbol, color) => {
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

const item = (id, name, cost, room, symbol, color, sceneType = "floor") => ({
  id,
  name,
  cost,
  room,
  symbol,
  sceneType,
  image: cartoonItem(name, symbol, color),
});

export const houseItems = [
  item("sunny-sofa", "Sunny Sofa", 15, "living", "🛋️", "#efac64", "furniture"),
  item("story-lamp", "Story Lamp", 20, "living", "💡", "#e98769", "lamp"),
  item("leafy-plant", "Leafy Plant", 25, "living", "🪴", "#83b68b", "plant"),
  item("rainbow-rug", "Rainbow Rug", 30, "living", "🌈", "#d88cbe", "rug"),
  item("book-nook", "Book Nook", 35, "living", "📚", "#7198d2", "furniture"),
  item("window-curtains", "Window Curtains", 40, "living", "🪟", "#ae92c4", "curtain"),
  item("cloud-pillows", "Cloud Pillows", 45, "living", "☁️", "#98c4d8", "soft"),
  item("family-photo", "Friendship Frame", 50, "living", "🖼️", "#f0b867", "wall"),
  item("record-player", "Record Player", 55, "living", "🎵", "#6fa89a", "surface"),
  item("tea-table", "Little Tea Table", 60, "living", "🫖", "#d98573", "table"),

  item("cozy-bed", "Cozy Bed", 65, "bedroom", "🛏️", "#8aa5d1", "furniture"),
  item("star-rug", "Star Rug", 70, "bedroom", "⭐", "#e9bd62", "rug"),
  item("nightstand", "Nightstand", 75, "bedroom", "🗄️", "#cf9668", "furniture"),
  item("moon-lamp", "Moon Lamp", 80, "bedroom", "🌙", "#8d83bd", "lamp"),
  item("soft-blanket", "Soft Blanket", 85, "bedroom", "🧣", "#df92a4", "soft"),
  item("dream-mobile", "Dream Mobile", 90, "bedroom", "💫", "#75afbc", "hanging"),
  item("art-wall", "Art Wall", 95, "bedroom", "🎨", "#e58969", "wall"),
  item("comfy-chair", "Comfy Chair", 100, "bedroom", "🪑", "#8eb179", "furniture"),
  item("toy-basket", "Toy Basket", 105, "bedroom", "🧸", "#f0b95f", "floor"),
  item("closet", "Colorful Closet", 110, "bedroom", "🚪", "#bd91c6", "furniture"),

  item("fruit-bowl", "Fruit Bowl", 115, "kitchen", "🍎", "#e88b64", "surface"),
  item("tea-kettle", "Tea Kettle", 120, "kitchen", "🫖", "#6fa7b0", "surface"),
  item("mixing-bowls", "Mixing Bowls", 125, "kitchen", "🥣", "#d18fbd", "surface"),
  item("cookie-jar", "Cookie Jar", 130, "kitchen", "🍪", "#d3a066", "surface"),
  item("sunny-table", "Sunny Table", 135, "kitchen", "🍽️", "#eeaf5e", "table"),
  item("wall-clock", "Wall Clock", 140, "kitchen", "🕰️", "#87aa81", "wall"),
  item("herb-garden", "Herb Garden", 145, "kitchen", "🌿", "#75aa7d", "surface"),
  item("recipe-board", "Recipe Board", 150, "kitchen", "📝", "#e58369", "wall"),
  item("happy-toaster", "Happy Toaster", 155, "kitchen", "🍞", "#7198d2", "surface"),
  item("cake-stand", "Cake Stand", 160, "kitchen", "🍰", "#d97dac", "surface"),
  item("dining-table", "Dining Table", 165, "kitchen", "🍽️", "#b9825d", "table"),
  item("place-settings", "Place Settings", 170, "kitchen", "🍴", "#87aeb8", "surface"),
  item("kitchen-utensils", "Kitchen Utensils", 175, "kitchen", "🥄", "#d3a066", "wall"),
  item("dinner-feast", "Dinner Feast", 180, "kitchen", "🥘", "#d9795f", "surface"),

  item("bubble-bath", "Bubble Bath", 215, "bathroom", "🛁", "#88bbd5", "furniture"),
  item("soft-towels", "Soft Towels", 220, "bathroom", "🧺", "#d59aae", "wall"),
  item("round-mirror", "Round Mirror", 225, "bathroom", "🪞", "#82b8b3", "wall"),
  item("toothbrush-cup", "Toothbrush Cup", 230, "bathroom", "🪥", "#e3a15f", "surface"),
  item("bath-mat", "Bath Mat", 235, "bathroom", "▰", "#9b91c5", "rug"),
  item("soap-set", "Sweet Soap Set", 240, "bathroom", "🧼", "#7aaf8e", "surface"),
  item("wash-basket", "Wash Basket", 245, "bathroom", "🧺", "#d28877", "floor"),
  item("shower-curtain", "Shower Curtain", 250, "bathroom", "🚿", "#80abc7", "curtain"),
  item("rubber-duck", "Rubber Duck", 255, "bathroom", "🦆", "#edbb59", "surface"),
  item("bathroom-plant", "Bathroom Plant", 260, "bathroom", "🪴", "#83b68b", "plant"),
  item("face-masks", "Face Masks", 265, "bathroom", "🧖", "#a3c9ae", "surface"),
  item("skin-care", "Skin Care Set", 270, "bathroom", "🧴", "#dfa0ae", "surface"),
  item("fuzzy-robe", "Fuzzy Robe", 325, "bathroom", "🥋", "#b9a5cb", "hanging"),

  item("office-desk", "Focus Desk", 275, "office", "🖥️", "#b9825d", "furniture"),
  item("desk-chair", "Desk Chair", 280, "office", "🪑", "#7198d2", "furniture"),
  item("bookcase", "Bookcase", 285, "office", "📚", "#d3a066", "furniture"),
  item("desk-lamp", "Desk Lamp", 290, "office", "💡", "#e9bd62", "lamp"),
  item("office-plant", "Office Plant", 295, "office", "🪴", "#83b68b", "plant"),
  item("wall-calendar", "Wall Calendar", 300, "office", "📅", "#e58369", "wall"),
  item("filing-cabinet", "Filing Cabinet", 305, "office", "🗄️", "#8d83bd", "furniture"),
  item("work-rug", "Work Rug", 310, "office", "▰", "#d88cbe", "rug"),
  item("wall-art", "Wall Art", 315, "office", "🖼️", "#f0b867", "wall"),
  item("coffee-maker", "Coffee Maker", 320, "office", "☕", "#6fa7b0", "surface"),
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
