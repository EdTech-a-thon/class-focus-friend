import { useEffect, useRef, useState } from "react";
import NoiseScale from "./NoiseScale";

const SAMPLE_SECONDS = 4;

const NoiseCard = ({ noise }) => {
  const { noiseMessage, noiseTone, expectation, microphone } = noise;
  const [showSetup, setShowSetup] = useState(false);
  const [calibrationStage, setCalibrationStage] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(SAMPLE_SECONDS);
  const [quietSample, setQuietSample] = useState(null);
  const samplesRef = useRef([]);

  useEffect(() => {
    if (calibrationStage === "quiet" || calibrationStage === "talking") {
      samplesRef.current.push(microphone.rawLevel);
    }
  }, [microphone.rawLevel, calibrationStage]);

  useEffect(() => {
    if (calibrationStage !== "quiet" && calibrationStage !== "talking") return;
    setSecondsLeft(SAMPLE_SECONDS);
    samplesRef.current = [];
    const countdown = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    const finish = window.setTimeout(() => {
      const samples = samplesRef.current;
      const average = samples.reduce((sum, value) => sum + value, 0) / Math.max(1, samples.length);
      if (calibrationStage === "quiet") {
        setQuietSample(average);
        setCalibrationStage("ready");
      } else {
        setCalibrationStage(microphone.setCalibration(quietSample, average) ? "done" : "retry");
      }
    }, SAMPLE_SECONDS * 1000);
    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(finish);
    };
  }, [calibrationStage, microphone.setCalibration, quietSample]);

  const beginCalibration = async () => {
    if (microphone.status !== "on" && !(await microphone.start())) return;
    setCalibrationStage("quiet");
  };

  return (
    <section className="card noise-card">
      <div className="card-heading">
        <div><p className="card-label">Classroom sound</p><h2>{noiseMessage}</h2></div>
        <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
      </div>
      <p className="noise-expectation">Goal for {expectation.label.toLowerCase()}: <b>{expectation.detail}</b></p>
      <NoiseScale microphone={microphone} noiseTone={noiseTone}/>

      <div className="noise-actions">
        <button className="outline" type="button" aria-pressed={microphone.status === "on"} disabled={microphone.status === "starting"} onClick={microphone.status === "on" ? microphone.stop : () => microphone.start()}>
          {microphone.status === "on" ? "Stop sound meter" : microphone.status === "starting" ? "Starting sound meter..." : "Turn on sound meter"}
        </button>
        <button className="plain-button" type="button" onClick={() => setShowSetup((value) => !value)} aria-expanded={showSetup}>Microphone setup</button>
      </div>

      {showSetup && (
        <div className="microphone-setup">
          <label htmlFor="microphone-choice">Microphone</label>
          <select id="microphone-choice" value={microphone.selectedDeviceId} onChange={(event) => microphone.selectDevice(event.target.value)}>
            {!microphone.devices.length && <option value="">Default microphone</option>}
            {microphone.devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${index + 1}`}</option>)}
          </select>

          <div className="calibration-panel" aria-live="polite">
            {calibrationStage === "idle" && <><p><b>{microphone.calibration ? "Sound meter calibrated." : "Calibrate for this room"}</b> This helps the meter match your microphone and classroom.</p><button className="outline" type="button" onClick={beginCalibration}>{microphone.calibration ? "Calibrate again" : "Start calibration"}</button></>}
            {calibrationStage === "quiet" && <p><b>Step 1 of 2:</b> Keep the room quiet for {secondsLeft} seconds…</p>}
            {calibrationStage === "ready" && <><p><b>Step 2 of 2:</b> Ask the class to talk at a normal group-work volume.</p><button className="primary" type="button" onClick={() => setCalibrationStage("talking")}>Measure normal voices</button></>}
            {calibrationStage === "talking" && <p><b>Listening:</b> Keep talking normally for {secondsLeft} seconds…</p>}
            {calibrationStage === "done" && <><p><b>Calibration complete.</b> The meter is ready for this room.</p><button className="outline" type="button" onClick={() => setCalibrationStage("idle")}>Done</button></>}
            {calibrationStage === "retry" && <><p><b>Let’s try that again.</b> The two sound levels were too similar.</p><button className="outline" type="button" onClick={() => setCalibrationStage("quiet")}>Restart calibration</button></>}
          </div>
        </div>
      )}

      {microphone.status === "denied" && <p className="help-text">Microphone access was not available. You can still run a focus session.</p>}
      {microphone.status === "missing" && <p className="help-text">That microphone is no longer available. Choose another microphone in setup.</p>}
      {microphone.status === "unsupported" && <p className="help-text">This browser cannot use the sound meter. The other classroom tools still work.</p>}
    </section>
  );
};

export default NoiseCard;
