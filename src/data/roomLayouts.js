// Percentages refer to the same 900 × 440 room at every screen size.
// The last value controls depth: rugs, furniture, then objects on surfaces.
const layouts = {
  living: {
    'sunny-sofa':[5,17,30], 'story-lamp':[85,18,10], 'leafy-plant':[72,16,10],
    'rainbow-rug':[25,3,43,0], 'book-nook':[57,26,15], 'window-curtains':[72,49,25],
    'cloud-pillows':[10,36,16,3], 'family-photo':[11,62,12],
    'record-player':[59,55,10,3], 'tea-table':[5,5,17],
  },
  bedroom: {
    'cozy-bed':[52,18,31], 'star-rug':[29,3,40,0], 'nightstand':[84,21,12],
    'moon-lamp':[86,39,8,3], 'soft-blanket':[58,26,21,3], 'dream-mobile':[51,67,10],
    'art-wall':[29,61,14], 'comfy-chair':[24,23,17], 'toy-basket':[9,7,12], 'closet':[4,25,19],
  },
  kitchen: {
    'fruit-bowl':[5,40,8,3], 'tea-kettle':[15,40,8,3], 'mixing-bowls':[25,40,8,3],
    'cookie-jar':[35,40,8,3], 'sunny-table':[4,6,20], 'wall-clock':[49,66,10],
    'herb-garden':[72,40,8,3], 'recipe-board':[33,66,11], 'happy-toaster':[84,40,9,3],
    'cake-stand':[8,26,9,3], 'dining-table':[60,4,34], 'place-settings':[65,40,7,3],
    'kitchen-utensils':[24,67,7], 'dinner-feast':[80,40,8,3],
  },
  bathroom: {
    'bubble-bath':[53,16,36], 'soft-towels':[32,62,11], 'round-mirror':[9,54,14],
    'toothbrush-cup':[7,40,7,3], 'bath-mat':[33,3,44,0], 'soap-set':[19,40,8,3],
    'wash-basket':[5,7,12], 'shower-curtain':[70,49,27], 'rubber-duck':[75,44,7,3],
    'bathroom-plant':[88,10,10], 'face-masks':[61,61,7,3], 'skin-care':[52,61,7,3],
    'fuzzy-robe':[33,43,10],
  },
  office: {
    'office-desk':[49,14,30], 'desk-chair':[29,15,17], 'bookcase':[5,24,18],
    'desk-lamp':[51,46,8,3], 'office-plant':[87,8,10], 'wall-calendar':[36,62,11],
    'filing-cabinet':[82,25,13], 'work-rug':[28,3,48,0], 'wall-art':[53,67,12],
    'coffee-maker':[84,43,8,3],
  },
};

export const roomPosition = (room, id) => {
  const [x,y,w,z=1] = layouts[room][id];
  return {x,y,w,z,anchor:'bottom'};
};
