import Link from "../Link/Link";
import OtterMark from "../Otter/OtterMark";

const accountButtonText = ({ teacher, saveState, isBusy }) => {
  if (isBusy && teacher) return "☁ Opening your classroom…";
  if (!teacher) return "☁ Sign in to save";
  if (saveState === "saving") return "☁ Saving…";
  if (saveState === "error") return "⚠ Not saved yet";
  return "☁ Saved to your account";
};

// The About and Privacy pages share this header, so the classroom's points and
// buttons only appear when a classroom was handed to it.
const Header = ({ header, rightLink }) => {
  const { points, onOpenExportImport, onOpenAccount, account } = header ?? {};
  return (
    <header className="app-header">
      <Link className="brand" href="/">
        <OtterMark />
        On-task Otter
      </Link>

      {header && (
        <>
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
        </>
      )}

      {rightLink && (
        <Link className="header-link" href={rightLink.href}>{rightLink.label}</Link>
      )}
    </header>

  )
}

export default Header;
