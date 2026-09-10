import { roomArtwork } from "./roomArtwork";
import { roomPosition as layoutPosition } from "./roomLayouts";

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

const item = (id, name, _cost, room, symbol, color, sceneType = "floor") => ({
  id,
  name,
  cost: nextRoomPrice(room),
  room,
  symbol,
  sceneType,
  image: roomArtwork(id, sceneType, color, iconSVG),
  roomImage: roomArtwork(id, sceneType, color, iconSVG),
  roomPosition: layoutPosition(room, id),
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
  { id: "living", name: "Living Room", icon: "⌂", description: "A sunny place to focus together.", image: cartoonRoom("Living Room", "HOME", "#d9e9db", "#caa27a") },
  { id: "bedroom", name: "Bedroom", icon: "☾", description: "A quiet space for cozy dreams.", image: cartoonRoom("Bedroom", "DREAM", "#ded8ee", "#b89072") },
  { id: "kitchen", name: "Kitchen", icon: "♨", description: "A cheerful spot for snacks.", image: cartoonRoom("Kitchen", "YUM", "#f6ddad", "#c99d75") },
  { id: "bathroom", name: "Bathroom", icon: "◌", description: "A fresh space to get ready.", image: cartoonRoom("Bathroom", "SPLASH", "#d1e9ed", "#b58d6d") },
  { id: "office", name: "Office", icon: "▣", description: "A bright space for big ideas.", image: cartoonRoom("Office", "FOCUS", "#e9e2d3", "#a88161") },
];
