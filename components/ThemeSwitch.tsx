"use client";

import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (stored === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      // ignore
    }
  }, [isDark]);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id="sketchy" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.035 0.042" numOctaves={4} result="noise" seed={42}></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={4.5} xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
          <filter id="sketchy-sm" x="-18%" y="-18%" width="136%" height="136%">
            <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves={3} result="noise" seed={7}></feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <label className="theme-switch">
        <input
          className="theme-switch__checkbox"
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark((s) => !s)}
          aria-label="Toggle theme"
        />
        <div className="theme-switch__container">
          <div className="theme-switch__clouds"></div>
          <div className="theme-switch__stars-container">
            <svg fill="none" viewBox="0 0 144 55" xmlns="http://www.w3.org/2000/svg">
                <svg fill="none" viewBox="0 0 144 55" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M2 27a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm20-10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm30 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
          </div>
          <div className="theme-switch__circle-container">
            <div className="theme-switch__sun-moon-container">
              <div className="theme-switch__moon">
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
                <div className="theme-switch__spot"></div>
              </div>
            </div>
          </div>
          <div className="theme-switch__shooting-star"></div>
          <div className="theme-switch__shooting-star-2"></div>
          <div className="theme-switch__meteor"></div>
          <div className="theme-switch__stars-cluster">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div>
          </div>
          <div className="theme-switch__aurora"></div>
          <div className="theme-switch__comets">
            <div className="comet"></div>
            <div className="comet"></div>
          </div>
        </div>
      </label>
    </>
  );
}
