import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

// A quiet question mark in the corner of every page, so a teacher who hits
// trouble mid-lesson can always find where to write to us.
const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        className="support-trigger"
        type="button"
        aria-label="Get help"
        onClick={() => setIsOpen(true)}
      >
        ?
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="support-modal"
        ariaLabelledBy="support-title"
        closeLabel="Close help window"
      >
        <p className="card-label">Help</p>
        <h2 id="support-title">Need a hand?</h2>
        <p className="support-copy">
          Email <a href="mailto:support@teacher.dev">support@teacher.dev</a> with any
          technical issues, feedback, or feature requests.
        </p>
      </Modal>
    </>
  );
};

export default SupportButton;
