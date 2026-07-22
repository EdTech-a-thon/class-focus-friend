import {encouragementMessages, getProgressMessageType} from "../../data/encouragementMessages";
import { useState } from "react";

const EncouragementMessage = ({ mode, timer }) => {
  const [genericMessage] = useState(() => {
    const messages = encouragementMessages.generic;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  })

  if (mode === "none") return null;

  if (mode === "generic") {
    return <p>{genericMessage}</p>;
  }

  const totalSeconds = timer.minutes * 60;
  const elapsedSeconds = totalSeconds - timer.secondsRemaining;
  const progress = elapsedSeconds / totalSeconds;

  const type = getProgressMessageType(progress);

  return (
    <p>
      {encouragementMessages[type][0]}
    </p>
  );
};

export default EncouragementMessage;