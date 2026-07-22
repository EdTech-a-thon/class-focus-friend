import ModalBackdrop from "./ModalBackdrop";
import ModalBox from "./ModalBox"

const Modal = ({
  isOpen,
  onClose,
  className = "",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalBox
        className={className}
        onClose={onClose}
      >
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
};

export default Modal;