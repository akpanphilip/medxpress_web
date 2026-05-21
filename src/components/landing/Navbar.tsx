"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "#features", label: "Features" },
  { href: "#specialties", label: "Specialties" },
  { href: "#how", label: "How it works" },
  { href: "#doctors", label: "Doctors" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "glass border-b border-border py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 sm:px-8">
        <Link href="/">
          <Logo size="sm" />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-surface-2 sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="press flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky to-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky/30"
          >
            Get started <ArrowRight size={15} />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="press grid h-10 w-10 place-items-center rounded-xl text-foreground lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl px-5 lg:hidden sm:px-8">
          <div className="rounded-2xl border border-border bg-surface p-3 shadow-xl">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-2"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-bold text-sky"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
