import Link from "next/link";
import { Globe, MessageCircle, Send, AtSign, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Find doctors", href: "#doctors" },
      { label: "Specialties", href: "#specialties" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#faq" },
      { label: "Emergency care", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
];

const socials = [Globe, MessageCircle, AtSign, Send];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="md" light />
            <p className="mt-4 max-w-xs text-sm text-white/65">
              Telemedicine that connects patients with verified doctors for
              video and chat consultations, anytime.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="press grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/80 transition hover:bg-sky hover:text-white"
                  aria-label="Social link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/65 transition hover:text-sky"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © 2026 MEDXPRESS. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/65">
            <Mail size={15} className="text-sky" />
            hello@medxpress.com
          </div>
          <Link
            href="/register"
            className="text-sm font-bold text-sky hover:underline"
          >
            Create your free account
          </Link>
        </div>
      </div>
    </footer>
  );
}
