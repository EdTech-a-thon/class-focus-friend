import ExportButton from "../Backup/ExportButton";
import { useState, useEffect } from "react";
import ExportSaveContent from "../Backup/ExportSaveContent";
import ImportButton from "../Backup/ImportButton";
import ImportSaveContent from "../Backup/ImportSaveContent";
import Modal from "../Modal/Modal";

const Header = ({ header }) => {
  const [openSaveModal, setOpenSaveModal] = useState(null);

  const { points } = header;
  return (
    <header className="app-header">
      <a className="brand" href="#dashboard">
        <span>✦</span>
        Class Focus Friend
      </a>

      <p>
        <b>★</b>
        {points} class points
      </p>
    <ExportButton onClick={() => setOpenSaveModal("export")}/>
    <ImportButton onClick={() => setOpenSaveModal("import")}/>

    <Modal
      isOpen={Boolean(openSaveModal)}
      onClose={() => setOpenSaveModal(null)}
      className="export-modal"
    >
      {openSaveModal === "export" ? (
        <ExportSaveContent />
      ) : (
        <ImportSaveContent />
      )}
    </Modal>


    </header>

  )
}

export default Header;