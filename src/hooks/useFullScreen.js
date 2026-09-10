import { useEffect, useState } from "react";

// Uses the browser's own full-screen view so a projected classroom shows only
// the otter's room and the focus session. Teachers can also leave full screen
// with the Esc key, so the screen follows the browser instead of keeping its
// own copy of whether full screen is on.
const isBrowserFullScreen = () => Boolean(document.fullscreenElement);

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(isBrowserFullScreen);

  useEffect(() => {
    const followBrowser = () => setIsFullScreen(isBrowserFullScreen());
    document.addEventListener("fullscreenchange", followBrowser);
    return () => document.removeEventListener("fullscreenchange", followBrowser);
  }, []);

  const enter = () => {
    if (!isBrowserFullScreen()) document.documentElement.requestFullscreen().catch(() => {});
  };

  const exit = () => {
    if (isBrowserFullScreen()) document.exitFullscreen().catch(() => {});
  };

  return {
    // Some browsers, such as Safari on iPhone, cannot show a page full screen.
    isSupported: Boolean(document.fullscreenEnabled),
    isFullScreen,
    enter,
    exit,
  };
};
