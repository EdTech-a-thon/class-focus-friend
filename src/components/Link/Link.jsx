import { navigate } from "../../hooks/useRoute";

// A link between the pages of this site. It is a real link, so it can be
// copied, opened in a new tab, or read out by a screen reader, but a plain
// click stays in the app instead of loading the whole page again.
const Link = ({ href, className, children, ...linkProps }) => {
  const openHere = (event) => {
    const wantsNewTab =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (wantsNewTab) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    <a className={className} href={href} onClick={openHere} {...linkProps}>
      {children}
    </a>
  );
};

export default Link;
