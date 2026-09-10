// Percentages refer to the same 900 × 440 room at every screen size.
// Depth puts rugs behind furniture and tabletop objects above their supports.
const layouts = {
  living: {
    'sunny-sofa': [5, 21, 30], 'story-lamp': [73, 23, 14], 'leafy-plant': [87, 22, 11],
    'rainbow-rug': [25, 3, 43, 0], 'book-nook': [53, 23, 17], 'window-curtains': [72, 49, 25],
    'cloud-pillows': [9, 41, 21, 3], 'family-photo': [12, 66, 10],
    'record-player': [55, 56, 13, 3], 'tea-table': [8, 3, 22, 4],
  },
  bedroom: {
    'cozy-bed': [52, 18, 31], 'star-rug': [29, 3, 40, 0], 'nightstand': [84, 21, 12],
    'moon-lamp': [86.5, 39, 7, 3], 'soft-blanket': [56, 24, 23, 3],
    'art-wall': [29, 61, 14], 'comfy-chair': [24, 23, 17], 'toy-basket': [9, 7, 12], 'closet': [4, 25, 19],
  },
  kitchen: {
    'fruit-bowl': [6, 47, 8, 3], 'tea-kettle': [31, 45, 7, 3], 'mixing-bowls': [7, 66, 8, 3],
    'cookie-jar': [17, 66, 7, 3], 'sunny-table': [5, 3, 24], 'wall-clock': [48, 67, 8],
    'herb-garden': [85, 47, 7, 3], 'recipe-board': [33, 66, 9], 'happy-toaster': [18, 47, 9, 3],
    'cake-stand': [13, 31, 8, 3], 'dining-table': [63, 3, 31], 'place-settings': [82, 29, 8, 3],
    'kitchen-utensils': [28, 59, 6], 'dinner-feast': [69, 29, 10, 3],
  },
  bathroom: {
    'bubble-bath': [62, 18, 29], 'soft-towels': [33, 56, 12], 'round-mirror': [11, 56, 11],
    'toothbrush-cup': [6, 47, 5, 3], 'bath-mat': [51, 5, 38, 0], 'soap-set': [25, 47, 5, 3],
    'wash-basket': [7, 7, 12], 'shower-curtain': [70, 49, 27], 'rubber-duck': [79, 39, 5, 3],
    'bathroom-plant': [87, 12, 11], 'face-masks': [58, 60, 5, 3], 'skin-care': [52, 60, 5, 3],
  },
  office: {
    'office-desk': [49, 14, 30], 'desk-chair': [29, 15, 17], 'bookcase': [5, 24, 18],
    'desk-lamp': [52, 46, 9, 3], 'office-plant': [87, 8, 10], 'wall-calendar': [36, 60, 8],
    'filing-cabinet': [82, 25, 13], 'work-rug': [28, 3, 48, 0], 'wall-art': [53, 67, 12],
    'coffee-maker': [85, 45, 7, 3],
  },
};

export const roomPosition = (room, id) => {
  const [x, y, w, z = 1] = layouts[room][id];
  return { x, y, w, z, anchor: 'bottom' };
};
