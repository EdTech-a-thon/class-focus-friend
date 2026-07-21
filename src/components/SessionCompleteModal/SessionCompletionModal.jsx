import Friend from "../Friend/Friend";

const CompletionModal = ({ equipped, showComplete, setShowComplete, minutes }) => {
  if (!showComplete) return null;

  return (
    <div className="modal-backdrop">
      <section
        className="completion-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="complete-title"
      >
        <div className="completion-friend">
          <Friend
            equipped={equipped}
            isCelebrating
            isFocusing={false}
            isMusicPlaying={false}
            noiseTone="neutral"
          />
        </div>

        <p className="eyebrow">
          Focus session complete
        </p>

        <h2 id="complete-title">
          Beautiful work, class!
        </h2>

        <p>
          You earned <b>{minutes} class points</b> for {minutes} minutes of shared focus.
        </p>

        <button
          className="primary"
          type="button"
          autoFocus
          onClick={() => setShowComplete(false)}
        >
          Celebrate
        </button>
      </section>
    </div>
  );
};

export default CompletionModal;
