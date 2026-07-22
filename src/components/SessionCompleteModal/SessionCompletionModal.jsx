import Friend from "../Friend/Friend";
import Modal from "../Modal/Modal";

const CompletionModal = ({ equipped, showComplete, duration, isTimerAlertPlaying, onClose, onSilenceAlert }) => {
  return (
    <Modal
      isOpen={showComplete}
      onClose={onClose}
      className="completion-modal"
      ariaLabelledBy="complete-title"
      showCloseButton={false}
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
          Your class completed <b>{duration}</b> of shared focus.
        </p>

        <div className="completion-actions">
          {isTimerAlertPlaying && (
            <button className="outline" type="button" autoFocus onClick={onSilenceAlert}>
              Turn off alarm
            </button>
          )}
          <button className="primary" type="button" autoFocus={!isTimerAlertPlaying} onClick={onClose}>
            Celebrate
          </button>
        </div>
    </Modal>
  );
};

export default CompletionModal;
