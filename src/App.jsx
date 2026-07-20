function Pet() {
  return (
    <div className="pet-scene" aria-label="A cheerful classroom friend">
      <span className="sparkle one" aria-hidden="true">*</span>
      <span className="sparkle two" aria-hidden="true">*</span>
      <div className="pet" aria-hidden="true">
        <span className="pet-ear left" />
        <span className="pet-ear right" />
        <div className="pet-face">• &nbsp; •<b>⌣</b></div>
        <div className="pet-body">♥</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="#dashboard"><span>✦</span> Class Focus Friend</a>
        <p>Ready for a fresh start</p>
      </header>
      <section className="welcome" id="dashboard">
        <div>
          <p className="eyebrow">Today&apos;s classroom goal</p>
          <h1>Let&apos;s make space for focus.</h1>
          <p>Set a shared work session, notice the room&apos;s energy, and celebrate every small win together.</p>
        </div>
        <Pet />
      </section>
      <section className="dashboard-placeholder">
        <p className="card-label">Classroom dashboard</p>
        <h2>Your focus tools are ready to set up.</h2>
      </section>
    </main>
  );
}
