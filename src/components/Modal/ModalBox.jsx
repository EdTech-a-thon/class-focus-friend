const ModalBox = ({
  className = "modal",
  onClose,
  ariaLabelledBy,
  closeLabel = "Close modal",
  showCloseButton = true,
  children,
}) => {
  return (
    <section
      className={`modal-box ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      {showCloseButton && (
        <button
          className="modal-close"
          type="button"
          aria-label={closeLabel}
          autoFocus
          onClick={onClose}
        >
          &times;
        </button>
      )}

      {children}
    </section>
  );
};

export default ModalBox;
