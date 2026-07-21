function cartoonItem(label, symbol, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260">
    <rect width="360" height="260" fill="#fff8ec"/>
    <rect width="360" height="185" fill="${color}" opacity=".28"/>
    <path d="M0 185h360v75H0z" fill="#d2a77c"/>
    <path d="M0 185h360" stroke="#805d45" stroke-width="7"/>
    <circle cx="290" cy="48" r="24" fill="#ffe48b"/>
    <path d="M66 192c0-65 34-110 114-110s114 45 114 110" fill="${color}" stroke="#29453e" stroke-width="8"/>
    <text x="180" y="177" text-anchor="middle" font-family="Arial, sans-serif" font-size="96">${symbol}</text>
    <text x="180" y="229" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="bold" fill="#29453e">${label}</text>
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
];

export const houseRooms = [
  { id: "living", name: "Living Room", icon: "⌂", description: "A sunny place to focus together.", sessionsRequired: 0, image: cartoonRoom("Living Room", "HOME", "#d9e9db", "#caa27a") },
  { id: "bedroom", name: "Bedroom", icon: "☾", description: "A quiet space for cozy dreams.", sessionsRequired: 3, image: cartoonRoom("Bedroom", "DREAM", "#ded8ee", "#b89072") },
  { id: "kitchen", name: "Kitchen", icon: "♨", description: "A cheerful spot for snacks.", sessionsRequired: 6, image: cartoonRoom("Kitchen", "YUM", "#f6ddad", "#c99d75") },
  { id: "bathroom", name: "Bathroom", icon: "◌", description: "A fresh space to get ready.", sessionsRequired: 10, image: cartoonRoom("Bathroom", "SPLASH", "#d1e9ed", "#b58d6d") },
];
