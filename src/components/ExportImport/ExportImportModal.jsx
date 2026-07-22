import { useEffect, useRef, useState } from "react";
import { createSaveFile, downloadSaveFile, getSaveFileName, openSubstituteHandoff, restoreSaveFile, validateSaveFile } from "../../utils/exportImportUtils";
import Modal from "../Modal/Modal";

const detectComputerType = () => {
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  return /Mac|iPhone|iPad/i.test(platform) ? "mac" : /Win/i.test(platform) ? "windows" : null;
}

const ExportImportModal = ({ classroomData, validIds, onClose }) => {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [computerType, setComputerType] = useState(detectComputerType);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const exportSetup = () => {
    const filename = getSaveFileName();
    openSubstituteHandoff(filename);
    downloadSaveFile(createSaveFile(classroomData), filename);
    setMessage({ type: "success", text: "Classroom Save Created!", filename });
  }

  const importSetup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const save = validateSaveFile(JSON.parse(await file.text()), validIds);
      restoreSaveFile(save);
      window.location.reload();
    } catch {
      setMessage({ type: "error", text: "Invalid save file" });
    } finally {
      event.target.value = "";
    }
  }

  return (
    <Modal
      isOpen
      onClose={onClose}
      className="export-import-modal"
      ariaLabelledBy="export-import-title"
      closeLabel="Close classroom save window"
    >
        <p className="export-import-label">Classroom Save File</p>
        <h2 id="export-import-title">Save or restore your classroom</h2>
        <p className="export-import-copy">Create one file that can bring your Focus Friend classroom setup back later.</p>

        <div className="export-import-included">
          <h3>What&apos;s included</h3>
          <ul>
            <li>✓ Timer settings and music preferences</li>
            <li>✓ Points, completed sessions, and history</li>
            <li>✓ Reward shop and house progress</li>
            <li>✓ Classroom customization</li>
          </ul>
          <p>🔒 No student personal information is included.</p>
        </div>

        <div className="export-import-actions">
          <button className="export-import-primary" type="button" onClick={exportSetup}>💾 Create Classroom Save File</button>
          <button className="export-import-secondary" type="button" onClick={() => fileInputRef.current?.click()}>📂 Restore Classroom Save</button>
          <input ref={fileInputRef} className="export-import-file" type="file" accept="application/json,.json" onChange={importSetup} />
        </div>

        {message?.type === "success" && (
          <div className="export-import-success" role="status">
            <h3>🎉 {message.text}</h3>
            <p>Your file has been saved to Downloads.</p>
            <p className="export-import-filename"><b>File:</b> {message.filename}</p>
            <h3>Where can I find it?</h3>
            <div className="export-import-os-buttons">
              <button type="button" className={computerType === "mac" ? "selected" : ""} onClick={() => setComputerType("mac")}>🍎 Mac</button>
              <button type="button" className={computerType === "windows" ? "selected" : ""} onClick={() => setComputerType("windows")}>🪟 Windows</button>
            </div>
            {computerType === "mac" && <p className="export-import-path">Open <b>Finder</b>, then select <b>Downloads</b> in the sidebar. You can also press <b>Option + Command + L</b>.</p>}
            {computerType === "windows" && <p className="export-import-path">Open <b>File Explorer</b>, then select <b>Downloads</b>. You can press <b>Windows key + E</b> to open File Explorer.</p>}
            <p className="export-import-download-note">If you changed your download location, check that folder instead.</p>
          </div>
        )}

        {message?.type === "error" && <p className="export-import-message error" role="alert">⚠ {message.text}. Choose a Focus Friend Classroom Save File.</p>}

        <div className="export-import-instructions">
          <h3>How to use your save file</h3>
          <ol>
            <li><b>To save:</b> Select “Create Classroom Save File.” Your browser places the JSON file in Downloads.</li>
            <li><b>Keep it safe:</b> Leave the filename unchanged and move or copy it anywhere you store classroom files.</li>
            <li><b>To restore:</b> Return here, select “Restore Classroom Save,” then choose that JSON file.</li>
            <li><b>Finish:</b> Focus Friend checks the file and reloads with your saved setup. The current setup is replaced.</li>
          </ol>
        </div>

        <button className="export-import-dismiss" type="button" onClick={onClose}>Close</button>
    </Modal>
  );
}

export default ExportImportModal;
