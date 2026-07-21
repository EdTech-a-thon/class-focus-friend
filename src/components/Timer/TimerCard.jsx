import MusicControls from "./MusicControls";
import TimerControls from "./TimerControls";

const TimerCard = ({ timerSettings, music }) => {
  return (
        <section className="card timer-card">
          <TimerControls timerSettings={timerSettings}/>
          <MusicControls music={music}/>
        </section>
  )
}

export default TimerCard;