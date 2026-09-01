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
  const { noiseMessage, noiseTone, expectation, microphone, activity, activities, setActivity, soundThresholds, trackSound, setTrackSound, setSoundThreshold, applySoundCalibration, loudThreshold } = noise;
  const [showSetup, setShowSetup] = useState(false);
  const [calibrationStage, setCalibrationStage] = useState("idle");
  const [secondsLeft, setSecondsLeft] = useState(SAMPLE_SECONDS);
  const [quietSample, setQuietSample] = useState(null);
  const [previewActivity, setPreviewActivity] = useState(null);
  const samplesRef = useRef([]);
  const previewThreshold = previewActivity ? soundThresholds[previewActivity] : expectation.threshold;
  const previewLabel = previewActivity ? activities[previewActivity].label : expectation.label;

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
          applySoundCalibration();
          microphone.stop();
        }
        setCalibrationStage(calibrated ? "done" : "retry");
      }
    }, SAMPLE_SECONDS * 1000);
    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(finish);
    };
  }, [applySoundCalibration, calibrationStage, microphone.setCalibration, microphone.stop, quietSample]);

  const beginCalibration = async () => {
    if (microphone.status !== "on" && !(await microphone.start())) return;
    setCalibrationStage("quiet");
  };

  return (
    <section className={`${embedded ? "embedded-noise-setup" : "card noise-card"}`}>
      <div className="card-heading">
        <div><p className="card-label">Classroom sound</p><h2>{!focusMode && !trackSound ? "Sound meter off" : noiseMessage}</h2></div>
        <i className={`status-dot ${noiseTone}`} aria-hidden="true" />
      </div>
      {!focusMode && <label className="checkbox-option sound-tracking-option">
        <input type="checkbox" checked={trackSound} onChange={(event) => setTrackSound(event.target.checked)} />
        Track classroom sound during this session
      </label>}
      {!focusMode && trackSound && <fieldset className="sound-profile-choice">
        <legend>Acceptable volume</legend>
        <div>
          {Object.entries(activities).map(([activityId, item]) => (
            <button className={activity === activityId ? "selected" : ""} type="button" key={activityId} onClick={() => setActivity(activityId)}>
              <b>{item.label} default</b><span>{item.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>}
      {(focusMode || trackSound) && <>
      <p className="noise-expectation">
        {previewActivity ? "Previewing" : "Goal for"} {previewLabel.toLowerCase()}:
        {' '}<b>{previewActivity ? `green through ${previewThreshold}%` : expectation.detail}</b>
      </p>
      <NoiseScale
        microphone={microphone}
        noiseTone={noiseTone}
        greenUntil={previewThreshold}
        redFrom={previewActivity ? Math.min(100, previewThreshold + 18) : loudThreshold}
      />

      <div className="noise-actions">
        {focusMode && <button className="outline" type="button" aria-pressed={microphone.status === "on"} disabled={microphone.status === "starting"} onClick={microphone.status === "on" ? microphone.stop : () => microphone.start()}>
          {microphone.status === "on" ? "Stop sound meter" : microphone.status === "starting" ? "Starting sound meter..." : "Turn on sound meter"}
        </button>}
        {!focusMode && <button className="plain-button" type="button" onClick={() => setShowSetup((value) => !value)} aria-expanded={showSetup}>{showSetup ? "Hide microphone choice" : "Choose microphone"}</button>}
      </div>

      {!focusMode && (
        <div className="microphone-setup">
          {showSetup && <><label htmlFor="microphone-choice">Microphone</label>
            <select id="microphone-choice" value={microphone.selectedDeviceId} onChange={(event) => microphone.selectDevice(event.target.value)}>
              {!microphone.devices.length && <option value="">Default microphone</option>}
              {microphone.devices.map((device, index) => <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${index + 1}`}</option>)}
            </select></>}

          <div className="calibration-panel" aria-live="polite">
            {calibrationStage === "idle" && <><p><b>Calibrate classroom sound</b> Measure this room so the colored ranges match what quiet and group work actually sound like.</p><button className="outline" type="button" onClick={beginCalibration}>{microphone.calibration ? "Calibrate again" : "Start calibration"}</button></>}
            {calibrationStage === "quiet" && <p><b>Step 1 of 2:</b> Keep the room quiet for {secondsLeft} seconds…</p>}
            {calibrationStage === "ready" && <><p><b>Step 2 of 2:</b> Ask the class to talk at a normal group-work volume.</p><button className="primary" type="button" onClick={() => setCalibrationStage("talking")}>Measure normal voices</button></>}
            {calibrationStage === "talking" && <p><b>Listening:</b> Keep talking normally for {secondsLeft} seconds…</p>}
            {calibrationStage === "done" && <><p><b>Calibration complete.</b> The meter is ready for this room.</p><button className="outline" type="button" onClick={() => setCalibrationStage("idle")}>Done</button></>}
            {calibrationStage === "retry" && <><p><b>Let’s try that again.</b> The two sound levels were too similar.</p><button className="outline" type="button" onClick={() => setCalibrationStage("quiet")}>Restart calibration</button></>}
          </div>

          <div className="sound-thresholds">
            <p><b>Fine-tune the colored ranges</b> Move a slider right if normal sound is triggering too soon, or left if loud sound is not triggering.</p>
            {Object.entries(activities).map(([activityId, item]) => (
              <label key={activityId}>
                <span><b>{item.label}</b><small>Green through {soundThresholds[activityId]}%</small></span>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={soundThresholds[activityId]}
                  onPointerDown={() => setPreviewActivity(activityId)}
                  onPointerUp={() => setPreviewActivity(null)}
                  onPointerCancel={() => setPreviewActivity(null)}
                  onKeyDown={() => setPreviewActivity(activityId)}
                  onBlur={() => setPreviewActivity(null)}
                  onChange={(event) => {
                    setPreviewActivity(activityId);
                    setSoundThreshold(activityId, Number(event.target.value));
                  }}
                />
              </label>
            ))}
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
