"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Video,
  CalendarCheck,
  FileText,
  Bell,
  Star,
  Search,
  Stethoscope,
  CheckCircle2,
  Plus,
  Minus,
  Siren,
  Quote,
} from "lucide-react";
import { doctors, specialties } from "@/lib/data";
import { formatMoney, personAvatar } from "@/lib/utils";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Rating from "@/components/ui/Rating";
import DynamicIcon from "@/components/ui/DynamicIcon";
import SmartImage from "@/components/ui/SmartImage";
import HeroArt from "@/components/landing/HeroArt";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { to: 12480, suffix: "+", label: "Patients served", decimals: 0 },
  { to: 218, suffix: "+", label: "Verified doctors", decimals: 0 },
  { to: 64000, suffix: "+", label: "Consultations done", decimals: 0 },
  { to: 4.9, suffix: "", label: "Average rating", decimals: 1 },
];

const features = [
  {
    icon: Video,
    title: "HD video consultations",
    body: "Meet doctors face to face from anywhere, with crystal-clear video and secure chat.",
    tone: "from-sky to-sky-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified doctors only",
    body: "Every doctor passes identity and license checks before they can consult.",
    tone: "from-online to-[#16a34a]",
  },
  {
    icon: FileText,
    title: "Digital prescriptions",
    body: "Receive prescriptions and lab requests instantly, stored safely in your account.",
    tone: "from-violet to-[#5b4ed8]",
  },
  {
    icon: Siren,
    title: "Emergency in one tap",
    body: "Urgent help is always a click away, day or night, from any screen.",
    tone: "from-red to-red-600",
  },
  {
    icon: CalendarCheck,
    title: "Effortless scheduling",
    body: "Pick a doctor, choose a slot and pay securely with Paystack or Stripe.",
    tone: "from-amber to-[#e08c0b]",
  },
  {
    icon: Bell,
    title: "Smart reminders",
    body: "Never miss a visit with timely alerts for appointments and new results.",
    tone: "from-sky to-violet",
  },
];

const steps = [
  {
    icon: Search,
    title: "Find your doctor",
    body: "Search by specialty or symptom and compare verified doctors by rating and fee.",
  },
  {
    icon: CalendarCheck,
    title: "Book and pay",
    body: "Pick a time slot that suits you and pay securely in seconds.",
  },
  {
    icon: Video,
    title: "Consult and heal",
    body: "Join the video call, get your diagnosis and receive a digital prescription.",
  },
];

const testimonials = [
  {
    name: "Amara Nwosu",
    role: "Patient, Lagos",
    img: personAvatar("Amara Nwosu"),
    quote:
      "I consulted a cardiologist within minutes. No traffic, no waiting room, just real care.",
  },
  {
    name: "Dr. Daniel Achebe",
    role: "Psychiatrist, Enugu",
    img: personAvatar("Dr. Daniel Achebe"),
    quote:
      "MEDXPRESS lets me reach more patients while keeping my schedule fully under control.",
  },
  {
    name: "Tunde Adebayo",
    role: "Patient, Abuja",
    img: personAvatar("Tunde Adebayo"),
    quote:
      "The emergency button gave my family real peace of mind. Help is genuinely one tap away.",
  },
];

const faqs = [
  {
    q: "Is MEDXPRESS available 24/7?",
    a: "Yes. Doctors are online around the clock, and emergency consultations can be started at any time.",
  },
  {
    q: "How do I pay for a consultation?",
    a: "You pay securely during booking using Paystack or Stripe. Each doctor's fee is shown upfront, with no hidden charges.",
  },
  {
    q: "Are the doctors verified?",
    a: "Every doctor completes identity and medical license verification before they can offer consultations on the platform.",
  },
  {
    q: "Can I get a prescription online?",
    a: "Yes. After your consultation the doctor issues a digital prescription, which you can view and download from your dashboard.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const featured = doctors.slice(0, 4);

  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-background pb-20 pt-32 sm:pt-40">
        <div className="aurora pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-sky/25" />
        <div className="aurora pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-violet/20" />
        <div className="aurora pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-red/12" />
        <div className="grid-pattern pointer-events-none absolute inset-0 text-foreground/[0.05]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-bold text-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-online" />
              Now live across Africa
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-6xl">
              Healthcare that
              <br />
              moves at the
              <br />
              <span className="text-gradient">speed of you.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              Consult verified doctors by video and chat, book appointments and
              get prescriptions, all from one beautiful platform.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/register" size="lg">
                Get started free <ArrowRight size={18} />
              </Button>
              <Button href="/login" variant="outline" size="lg">
                <Play size={16} /> See it in action
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["Amara", "Tunde", "Zainab", "Chidi", "Ngozi"].map((n) => (
                  <img
                    key={n}
                    src={personAvatar(n)}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-background bg-sky/20 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="fill-amber" />
                  ))}
                </div>
                <p className="text-xs text-muted">
                  Loved by 12,000+ patients
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <HeroArt />
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-12 sm:px-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-4xl font-extrabold text-sky">
                <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-1 text-sm font-semibold text-muted">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge tone="sky">Why MEDXPRESS</Badge>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Everything you need for
            <span className="text-sky"> better care</span>
          </h2>
          <p className="mt-3 text-muted">
            A complete telemedicine experience built around speed, trust and a
            genuinely delightful interface.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10">
                <div
                  className={`grid h-13 w-13 place-items-center rounded-xl bg-gradient-to-br ${f.tone} text-white shadow-lg`}
                >
                  <f.icon size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== SPECIALTIES ===== */}
      <section id="specialties" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Badge tone="violet">Specialties</Badge>
              <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                Care for every need
              </h2>
            </div>
            <Button href="/register" variant="outline">
              Browse all doctors <ArrowRight size={16} />
            </Button>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {specialties.map((s, i) => (
              <Reveal key={s.id} delay={(i % 5) * 0.06}>
                <Link
                  href="/register"
                  className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-background p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-sky/50 hover:bg-sky/5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky/10 text-sky transition group-hover:bg-sky group-hover:text-white">
                    <DynamicIcon name={s.icon} size={26} />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{s.name}</p>
                    <p className="text-xs text-muted">{s.count} doctors</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge tone="sky">How it works</Badge>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            See a doctor in 3 simple steps
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="relative h-full rounded-2xl border border-border bg-surface p-6">
                <span className="absolute right-5 top-4 font-display text-5xl font-extrabold text-sky/10">
                  0{i + 1}
                </span>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky to-sky-600 text-white shadow-lg shadow-sky/30">
                  <step.icon size={26} />
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== DOCTORS ===== */}
      <section id="doctors" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge tone="online">Our doctors</Badge>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Meet a few of our top-rated specialists
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((d, i) => (
              <Reveal key={d.id} delay={(i % 4) * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-background transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky/10">
                  <div className="relative h-56 overflow-hidden">
                    <SmartImage
                      src={personAvatar(d.name)}
                      alt={d.name}
                      className="h-full w-full"
                      imgClassName="transition duration-500 group-hover:scale-110"
                      icon={Stethoscope}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/85 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-display font-extrabold text-white">
                        {d.name}
                      </p>
                      <p className="text-xs font-semibold text-sky-400">
                        {d.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <Rating value={d.rating} size={14} />
                    <span className="font-display font-extrabold text-sky">
                      {formatMoney(d.fee)}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge tone="amber">Loved by patients</Badge>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Real stories, real care
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <Quote size={28} className="text-sky/30" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                  {t.quote}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
          <Reveal className="text-center">
            <Badge tone="sky">FAQ</Badge>
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              Questions, answered
            </h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-bold">{f.q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky/10 text-sky">
                      {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-700 to-navy px-6 py-14 text-center text-white sm:px-12">
            <div className="aurora pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-sky/30" />
            <div className="aurora pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-violet/25" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold sm:text-4xl">
                Your next doctor is just one click away
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                Join thousands getting faster, friendlier healthcare with
                MEDXPRESS. It is free to start.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button href="/register" size="lg">
                  Create free account <ArrowRight size={18} />
                </Button>
                <Button href="/login" variant="glass" size="lg">
                  Sign in
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/65">
                {[
                  "No credit card needed",
                  "Verified doctors",
                  "Cancel anytime",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-online" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
