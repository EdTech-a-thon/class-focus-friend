const Friend = ({ equipped }) => {
  return (
    <div className="friend-scene" aria-label="A cheerful classroom friend">
      <span className="sparkle one" aria-hidden="true">*</span>
      <span className="sparkle two" aria-hidden="true">*</span>
      <div className="friend" aria-hidden="true">
        {equipped.includes("party-hat") && <span className="friend-hat">▲</span>}
        <span className="friend-ear left" />
        <span className="friend-ear right" />
        <div className="friend-face">
          • &nbsp; •<b>⌣</b>
          {equipped.includes("glasses") && <i className="friend-glasses">⌐■-■</i>}
        </div>
        <div className="friend-body">
          ♥
          {equipped.includes("bow-tie") && <i className="friend-bow">◆</i>}
        </div>
      </div>
    </div>
  );
}

export default Friend;