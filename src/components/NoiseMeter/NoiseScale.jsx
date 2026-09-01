const NoiseScale = ({ microphone, noiseTone, greenUntil = 34, redFrom = 67 }) => {
  return (
    <section>
      <div
        className="meter"
        style={{ background: `linear-gradient(90deg, #cce2d3 0 ${greenUntil}%, #f3dda4 ${greenUntil}% ${redFrom}%, #efc0b0 ${redFrom}% 100%)` }}
        role="meter"
        aria-label="Current classroom sound"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={microphone.level}
      >
        <span className={noiseTone} style={{ width: `${microphone.level}%` }} />
      </div>
      <div className="noise-scale"><span>Quiet</span><span>Talking</span><span>Lively</span></div>
    </section>
  );
};

export default NoiseScale;
