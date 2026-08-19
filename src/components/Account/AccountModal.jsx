import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const AccountModal = ({ account, onClose }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearError } = account;

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  useEffect(() => clearError, [clearError, isCreating]);

  const submit = async (event) => {
    event.preventDefault();
    const signedIn = isCreating
      ? await account.createAccount(email, password)
      : await account.signIn(email, password);

    if (!signedIn) return;
    setPassword("");
    onClose();
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      className="account-modal"
      ariaLabelledBy="account-title"
      closeLabel="Close teacher account window"
    >
      {account.teacher ? (
        <>
          <p className="account-label">Teacher Account</p>
          <h2 id="account-title">Your classroom saves itself</h2>
          <p className="account-copy">
            Signed in as <b>{account.teacher.email}</b>. Every session, point, and room stays with
            your account, so you can pick up on any computer by signing in again.
          </p>

          <button className="account-secondary" type="button" onClick={account.signOut}>
            Sign out
          </button>
          <p className="account-note">
            Signing out leaves this classroom on this computer. Nothing is erased.
          </p>
        </>
      ) : (
        <>
          <p className="account-label">Teacher Account</p>
          <h2 id="account-title">{isCreating ? "Create your account" : "Welcome back"}</h2>
          <p className="account-copy">
            {isCreating
              ? "An account keeps your class points and classroom setup safe, so you never have to save a file. Your classroom on this screen becomes the starting point."
              : "Sign in to bring back the class points and classroom setup saved to your account. What is on this screen now will be replaced by your saved classroom."}
          </p>

          <form className="account-form" onSubmit={submit}>
            <label htmlFor="account-email">School email</label>
            <input
              id="account-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="account-password">Password</label>
            <input
              id="account-password"
              type="password"
              autoComplete={isCreating ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {isCreating && <p className="account-hint">Use at least 8 characters.</p>}

            {account.errorMessage && (
              <p className="account-message error" role="alert">
                ⚠ {account.errorMessage}
              </p>
            )}

            <button className="account-primary" type="submit" disabled={account.isBusy}>
              {account.isBusy ? "One moment…" : isCreating ? "Create account" : "Sign in"}
            </button>
          </form>

          <button
            className="account-switch"
            type="button"
            onClick={() => setIsCreating((creating) => !creating)}
          >
            {isCreating ? "I already have an account" : "I need to create an account"}
          </button>

          <p className="account-note">
            No account needed to use Focus Friend. Without one, your classroom stays on this
            computer only.
          </p>
        </>
      )}
    </Modal>
  );
};

export default AccountModal;
