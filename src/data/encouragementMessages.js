const encouragementMessages = {
  none: [
    "You're helping Friend focus!"
  ],
  
  generic: [
    "One step at a time.",
    "You're making progress.",
    "Stay focused—you've got this.",
    "Your effort matters.",
    "Keep going!",
    "Small steps add up.",
    "Learning takes practice.",
  ],

  beginning: [
    "Let's get started!",
    "Settle into your work.",
    "Every great idea starts with a first step.",
  ],

  middle: [
    "You're making great progress.",
    "Keep up the good work!",
    "Stay focused and keep building.",
  ],

  ending: [
    "Finish strong!",
    "You're doing amazing.",
    "Give it your best effort.",
  ],
};

const getProgressMessageType = (progress) => {
  if (progress < 0.25) return "beginning";

  if (progress < 0.75) return "middle";

  return "ending";
};

export { encouragementMessages, getProgressMessageType };