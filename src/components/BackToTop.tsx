"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Appears after scrolling down; smooth-scrolls back to the top of the page. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="press fade-up fixed bottom-6 left-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-border bg-surface text-foreground shadow-xl shadow-navy/15 transition hover:border-sky hover:text-sky"
    >
      <ArrowUp size={20} />
    </button>
  );
}
