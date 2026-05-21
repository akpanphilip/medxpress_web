"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** A thin progress bar at the very top of the page during route navigation. */
export default function TopProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Complete the bar whenever the route has finished changing.
  useEffect(() => {
    if (tick.current) {
      clearInterval(tick.current);
      tick.current = null;
    }
    setWidth(100);
    hide.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 320);
    return () => {
      if (hide.current) clearTimeout(hide.current);
    };
  }, [pathname]);

  // Start the bar when an in-app link is clicked.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || anchor.getAttribute("target") === "_blank")
        return;
      const dest = new URL(href, window.location.origin);
      if (dest.pathname === window.location.pathname) return;

      if (tick.current) clearInterval(tick.current);
      setVisible(true);
      setWidth(10);
      tick.current = setInterval(() => {
        setWidth((w) => (w >= 88 ? w : w + Math.random() * 14));
      }, 260);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[3px]">
      {visible && (
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-sky via-violet to-sky transition-all duration-300 ease-out"
          style={{
            width: `${width}%`,
            opacity: width >= 100 ? 0 : 1,
            boxShadow: "0 0 12px rgba(56,182,255,0.7)",
          }}
        />
      )}
    </div>
  );
}
