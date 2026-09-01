import { useEffect, useState } from "react";

// The whole site is one page. Moving between the classroom and the About and
// Privacy pages only changes the address in the bar and re-renders, and the
// site sends the same page for every address, so these links still work when
// one is opened, refreshed, or shared on its own.
const NAVIGATE_EVENT = "ontaskotter:navigate";

const currentPath = () => window.location.pathname || "/";

export const useRoute = () => {
  const [route, setRoute] = useState(currentPath);

  useEffect(() => {
    const followAddress = () => setRoute(currentPath());

    // The back and forward buttons, and the app's own links.
    window.addEventListener("popstate", followAddress);
    window.addEventListener(NAVIGATE_EVENT, followAddress);
    return () => {
      window.removeEventListener("popstate", followAddress);
      window.removeEventListener(NAVIGATE_EVENT, followAddress);
    };
  }, []);

  return route;
};

export const navigate = (to) => {
  if (currentPath() === to) return;
  window.history.pushState(null, "", to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo(0, 0);
};
