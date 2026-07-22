import { useEffect } from "react";
import { createSaveFile, downloadSaveFile } from "../../utils/exportImportUtils";
import Modal from "../Modal/Modal";

const ClearDataModal = ({ classroomData, onClose, onConfirm }) => {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const saveBeforeErasing = () => {
    downloadSaveFile(createSaveFile(classroomData));
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      className="clear-data-modal"
      ariaLabelledBy="clear-data-title"
      closeLabel="Close erase data window"
    >
        <p className="clear-data-label">Permanent action</p>
        <h2 id="clear-data-title">Are you super sure you want to erase the data?</h2>
        <p className="clear-data-copy">There&apos;s no going back. We recommend saving first.</p>

        <button className="clear-data-save" type="button" onClick={saveBeforeErasing}>
          Save classroom setup first
        </button>

        <div className="clear-data-actions">
          <button className="clear-data-cancel" type="button" onClick={onClose}>Keep my data</button>
          <button className="clear-data-confirm" type="button" onClick={onConfirm}>Erase saved data</button>
        </div>
    </Modal>
  );
};

export default ClearDataModal;
