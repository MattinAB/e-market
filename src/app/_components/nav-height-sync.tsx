"use client";
import { useEffect } from "react";

export default function NavHeightSync() {
  useEffect(() => {
    const navSelector = "[data-site-nav]";

    const update = () => {
      const navEl = document.querySelector<HTMLElement>(navSelector);
      if (!navEl) return;
      const height = Math.ceil(navEl.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    };

    update();

    // ResizeObserver to catch dynamic changes when nav content changes
    let ro: ResizeObserver | null = null;
    const navEl = document.querySelector(navSelector);
    if (navEl && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(navEl);
    }

    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (ro) ro.disconnect();
    };
  }, []);

  return null;
}
