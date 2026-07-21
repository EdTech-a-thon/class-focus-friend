const Header = ({ header }) => {
  const { points } = header;
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

    </header>
  )
}

export default Header;