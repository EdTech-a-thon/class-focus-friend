import ModalBackdrop from "./ModalBackdrop";
import ModalBox from "./ModalBox"

const Modal = ({
  isOpen,
  onClose,
  className = "",
  ariaLabelledBy,
  closeLabel = "Close modal",
  showCloseButton = true,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalBox
        className={className}
        onClose={onClose}
        ariaLabelledBy={ariaLabelledBy}
        closeLabel={closeLabel}
        showCloseButton={showCloseButton}
      >
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
};

export default Modal;
