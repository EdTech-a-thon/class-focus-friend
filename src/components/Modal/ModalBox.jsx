const ModalBox = ({
  className = "modal",
  onClose,
  children,
}) => {
  return (
    <section
      className={`modal-box ${className}`}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="modal-close"
        type="button"
        aria-label="Close modal"
        autoFocus
        onClick={onClose}
      >
        &times;
      </button>

      {children}
    </section>
  );
};

export default ModalBox;