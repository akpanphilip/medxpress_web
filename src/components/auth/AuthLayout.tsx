import Link from "next/link";
import { ArrowLeft, ShieldCheck, Star, Video } from "lucide-react";
import { personAvatar } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="aurora pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-sky/30" />
        <div className="aurora pointer-events-none absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-violet/25" />
        <div className="grid-pattern pointer-events-none absolute inset-0 text-white/[0.06]" />

        <Link href="/" className="relative">
          <Logo size="md" light />
        </Link>

        <div className="relative space-y-7">
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            The modern way
            <br />
            to see a doctor.
          </h2>
          <p className="max-w-sm text-white/65">
            Join thousands consulting verified doctors by video and chat, with
            prescriptions and emergency care built in.
          </p>
          <div className="space-y-3">
            {[
              { icon: ShieldCheck, text: "Every doctor verified before going live" },
              { icon: Video, text: "HD video and secure chat consultations" },
              { icon: Star, text: "Rated 4.9 by 12,000+ patients" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                  <item.icon size={18} className="text-sky" />
                </div>
                <p className="text-sm font-medium text-white/85">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex -space-x-2">
            {["Amara", "Chidi", "Zainab", "Ngozi"].map((n) => (
              <img
                key={n}
                src={personAvatar(n)}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-navy bg-sky/20 object-cover"
              />
            ))}
          </div>
          <p className="text-sm font-medium text-white/80">
            Trusted by patients and doctors every day.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:hidden">
            <Logo size="sm" />
          </Link>
          <Link
            href="/"
            className="hidden items-center gap-1.5 text-sm font-bold text-muted transition hover:text-sky lg:flex"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <div className="mx-auto w-full max-w-md">
            <h1 className="font-display text-3xl font-extrabold">{title}</h1>
            <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
