import { useEffect, useRef, useState } from "react";
import NoiseScale from "./NoiseScale";

const SAMPLE_SECONDS = 5;

const getStableAverage = (samples) => {
  const sorted = [...samples].sort((a, b) => a - b);
  const trim = Math.floor(sorted.length * 0.15);
  const stableSamples = sorted.slice(trim, sorted.length - trim || sorted.length);
  return stableSamples.reduce((sum, value) => sum + value, 0) / Math.max(1, stableSamples.length);
};

const NoiseCard = ({ noise, focusMode = false, embedded = false }) => {
  const { noiseMessage, noiseTone, expectation, microphone, activity, activities, setActivity, soundThresholds, trackSound, setTrackSound, setSoundThreshold, loudThreshold } = noise;
  const dialogRef = useRef(null);
  const [calibrationStage, setCalibrationStage] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(SAMPLE_SECONDS);
  const [quietSample, setQuietSample] = useState(null);
  const samplesRef = useRef([]);
  const previewThreshold = expectation.threshold;
  const previewLabel = expectation.label;

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
      const average = getStableAverage(samples);
      if (calibrationStage === "quiet") {
        setQuietSample(average);
        setCalibrationStage("ready");
      } else {
        const calibrated = microphone.setCalibration(quietSample, average);
        if (calibrated) {
          microphone.stop();
        }
        setCalibrationStage(calibrated ? "done" : "retry");
      }
    }, SAMPLE_SECONDS * 1000);
    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(finish);
    };
  }, [calibrationStage, microphone.setCalibration, microphone.stop, quietSample]);

  const beginCalibration = async () => {
    if (microphone.status !== "on" && !(await microphone.start())) return;
    setCalibrationStage("quiet");
  };

  return (
    <section className={`${embedded ? "embedded-noise-setup" : "card noise-card"}`}>
      {focusMode && <div className="card-heading">
        <div><p className="card-label">{focusMode ? "Classroom sound" : "3. Sound tracking"}</p><h2>{focusMode ? noiseMessage : "Track sound for this session?"}</h2></div>
        <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
      </div>}
      {!focusMode && <label className="checkbox-option sound-tracking-option">
        <input type="checkbox" checked={trackSound} onChange={(event) => setTrackSound(event.target.checked)} />
        Track classroom sound
      </label>}
      {!focusMode && trackSound && <fieldset className="sound-profile-choice">
        <legend>Acceptable volume</legend>
        <div>
          {Object.entries(activities).map(([activityId, item]) => (
            <button className={activity === activityId ? "selected" : ""} type="button" key={activityId} onClick={() => setActivity(activityId)}>
              <b>{item.label}</b>
            </button>
          ))}
        </div>
      </fieldset>}
      {(focusMode || trackSound) && <>
      {focusMode && <><p className="noise-expectation">
        Goal for {previewLabel.toLowerCase()}:
        {' '}<b>{expectation.detail}</b>
      </p>
      <NoiseScale
        microphone={microphone}
        noiseTone={noiseTone}
        greenUntil={previewThreshold}
        redFrom={loudThreshold}
      /></>}

      <div className="noise-actions">
        {!focusMode && <button className="outline" type="button" onClick={() => dialogRef.current.showModal()}>Microphone & calibration…</button>}

      </div>

      {!focusMode && (
        <div className="microphone-setup">
          <dialog className="sound-calibration-dialog" aria-labelledby="calibration-title" ref={dialogRef} onClose={() => { setCalibrationStage("idle"); microphone.stop(); }}>
            <h2 id="calibration-title">{calibrationStage === "done" ? "Your recommended sound levels" : "Microphone calibration"}</h2>
            {calibrationStage !== "done" && <>
            <p className="help-text">Adjust the meter for this room and device. This does not change your saved session sound limits.</p>
            <label htmlFor="microphone-choice">Microphone</label>
            <select id="microphone-choice" value={microphone.selectedDeviceId} onChange={(event) => { setCalibrationStage("idle"); microphone.selectDevice(event.target.value); }}>
              {!microphone.devices.length && <option value="">Default microphone</option>}
              {microphone.devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${index + 1}`}</option>)}
            </select></>}

          <div className="calibration-panel" aria-live="polite">
            {calibrationStage === "idle" && <><p><b>Calibrate classroom sound</b> Measure this room so the colored ranges match what quiet and group work actually sound like.</p><button className="outline" type="button" onClick={beginCalibration}>{microphone.calibration ? "Calibrate again" : "Start calibration"}</button></>}
            {calibrationStage === "quiet" && <p><b>Step 1 of 2:</b> Keep the room quiet for {secondsLeft} seconds…</p>}
            {calibrationStage === "ready" && <><p><b>Step 2 of 2:</b> Ask the class to talk at a normal group-work volume.</p><button className="primary" type="button" onClick={() => setCalibrationStage("talking")}>Measure normal voices</button></>}
            {calibrationStage === "talking" && <p><b>Listening:</b> Keep talking normally for {secondsLeft} seconds…</p>}
            {calibrationStage === "done" && <>
              <p>Calibration complete. Try these starting limits on your calibrated meter:</p>
              <dl className="calibration-recommendations">
                <div><dt>Individual work</dt><dd>30%</dd></div>
                <div><dt>Group work</dt><dd>70%</dd></div>
              </dl>
              <p>Use these percentages when setting up a session, then adjust to suit your class. Your saved session limits stay as they are.</p>
            </>}
            {calibrationStage === "retry" && <><p><b>Let’s try that again.</b> The two sound levels were too similar.</p><button className="outline" type="button" onClick={() => setCalibrationStage("quiet")}>Restart calibration</button></>}
          </div>

            <div className="calibration-footer"><button className="outline" type="button" onClick={() => dialogRef.current.close()}>{calibrationStage === "done" ? "Done" : "Close calibration"}</button></div>
            {["denied", "missing", "unsupported"].includes(microphone.status) && <p role="alert">Microphone unavailable. Check browser permission or choose another microphone.</p>}
          </dialog>
          <div className="sound-thresholds">
            <label>
              <span><b>Sound limit for this session</b><small>Green through {soundThresholds[activity]}%</small></span>
              <input type="range" min="10" max="80" value={soundThresholds[activity]} onChange={(event) => setSoundThreshold(activity, Number(event.target.value))} />
            </label>

          </div>
        </div>
      )}
      </>}

      {microphone.status === "denied" && <p className="help-text">Microphone access was not available. You can still run a focus session.</p>}
      {microphone.status === "missing" && <p className="help-text">That microphone is no longer available. Choose another microphone in setup.</p>}
      {microphone.status === "unsupported" && <p className="help-text">This browser cannot use the sound meter. The other classroom tools still work.</p>}
    </section>
  );
};

export default NoiseCard;
