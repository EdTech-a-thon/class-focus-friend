const Header = ({ header }) => {
  const { points, onOpenExportImport } = header;
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
      <button className="export-import-trigger" type="button" onClick={onOpenExportImport}>Save Classroom Setup</button>
    </header>

  )
}

export default Header;
