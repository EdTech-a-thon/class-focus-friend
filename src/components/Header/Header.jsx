const accountButtonText = ({ teacher, saveState, isBusy }) => {
  if (isBusy && teacher) return "☁ Opening your classroom…";
  if (!teacher) return "☁ Sign in to save";
  if (saveState === "saving") return "☁ Saving…";
  if (saveState === "error") return "⚠ Not saved yet";
  return "☁ Saved to your account";
};

const Header = ({ header }) => {
  const { points, onOpenExportImport, onOpenAccount, account } = header;
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
      <div className="app-header-actions">
        <button
          className={`account-trigger ${account.saveState === "error" ? "warning" : ""}`}
          type="button"
          title={account.teacher ? `Signed in as ${account.teacher.email}` : undefined}
          onClick={onOpenAccount}
        >
          {accountButtonText(account)}
        </button>
        <button className="export-import-trigger" type="button" onClick={onOpenExportImport}>Save Classroom Setup</button>
      </div>
    </header>

  )
}

export default Header;
