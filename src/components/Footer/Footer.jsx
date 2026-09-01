import edtechathonLogo from "../../assets/edtechathon-logo.svg";
import Link from "../Link/Link";

const Footer = () => (
  <footer className="site-footer">
    <a
      className="edtechathon-credit"
      href="https://edtechathon.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={edtechathonLogo} alt="" />
      Built by the EdTech-a-thon
    </a>
    <Link href="/about">about</Link>
    <Link href="/privacy">privacy</Link>
  </footer>
);

export default Footer;
