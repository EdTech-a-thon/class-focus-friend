const NoiseScale = ({ microphone, noiseTone}) => {
  return (
    <section>
      <div className="meter" role="meter" aria-label="Current classroom sound" aria-valuemin="0" aria-valuemax="100" aria-valuenow={microphone.level}>
              <span className={noiseTone} style={{ width: `${microphone.level}%` }} />
            </div>
            <div className="noise-scale"><span>Quiet</span><span>Talking</span><span>Lively</span></div>
    </section>
  )
}

export default NoiseScale;