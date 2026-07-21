import NoiseScale from "./NoiseScale";

const NoiseCard = ({ noise }) => {
  const {
    noiseMessage,
    noiseTone,
    expectation,
    microphone,
  } = noise;
  return (
    <section className="card noise-card">
          <div className="card-heading">
            <div><p className="card-label">Classroom sound</p><h2>{noiseMessage}</h2></div>
            <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
          </div>
          <p className="noise-expectation">Goal for {expectation.label.toLowerCase()}: <b>{expectation.detail}</b></p>
          <NoiseScale microphone={microphone} noiseTone={noiseTone}/>
          <button className="outline" type="button" aria-pressed={microphone.status === "on"} onClick={microphone.status === "on" ? microphone.stop : microphone.start}>
            {microphone.status === "on" ? "Stop sound meter" : "Turn on sound meter"}
          </button>
          {microphone.status === "denied" && <p className="help-text">Microphone access was not available. You can still run a focus session.</p>}
          {microphone.status === "unsupported" && <p className="help-text">This browser cannot use the sound meter. The other classroom tools still work.</p>}
        </section>
  )
}

export default NoiseCard;