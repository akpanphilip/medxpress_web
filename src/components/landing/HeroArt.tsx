"use client";

import { motion } from "motion/react";
import {
  Activity,
  HeartPulse,
  CalendarCheck,
  FileText,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Abstract, animated illustration of the telemedicine experience (no people). */
export default function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Soft glow */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-sky/40 to-violet/40 blur-3xl" />

      {/* Orbiting dots */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-sky" />
        <span className="absolute bottom-2 left-6 h-2.5 w-2.5 rounded-full bg-violet" />
        <span className="absolute right-3 top-1/3 h-2 w-2 rounded-full bg-red" />
      </motion.div>

      {/* Main panel */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease }}
        className="absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-navy/15"
      >
        {/* App bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky to-sky-700 text-white">
              <Activity size={16} strokeWidth={3} />
            </span>
            <span className="text-sm font-extrabold">Live consultation</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-online/15 px-2.5 py-1 text-[10px] font-bold text-online">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-online" />
            ONLINE
          </span>
        </div>

        {/* Pulsing emblem */}
        <div className="relative my-7 grid place-items-center">
          <span className="pulse-ring absolute h-24 w-24 rounded-full bg-sky/40" />
          <span
            className="pulse-ring absolute h-24 w-24 rounded-full bg-violet/30"
            style={{ animationDelay: "0.9s" }}
          />
          <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-sky to-violet text-white shadow-xl shadow-sky/40">
            <HeartPulse size={44} strokeWidth={2.4} />
          </div>
        </div>

        {/* Heartbeat line */}
        <svg viewBox="0 0 280 56" className="w-full">
          <motion.path
            d="M0 32 H66 l10 0 l9 -24 l11 44 l9 -32 l9 12 H280"
            fill="none"
            stroke="url(#ecg)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 0.5,
            }}
          />
          <defs>
            <linearGradient id="ecg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#38b6ff" />
              <stop offset="1" stopColor="#7c6cff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Doctor list abstraction */}
        <div className="mt-3 space-y-2">
          {[
            { tone: "from-sky to-sky-600", w: "w-3/5" },
            { tone: "from-violet to-[#5b4fd1]", w: "w-2/5" },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.15 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-2.5"
            >
              <span
                className={cn(
                  "h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br",
                  row.tone,
                )}
              />
              <div className="flex-1 space-y-1.5">
                <span className={cn("block h-2 rounded-full bg-foreground/15", row.w)} />
                <span className="block h-2 w-1/3 rounded-full bg-foreground/10" />
              </div>
              <span className="rounded-md bg-sky/15 px-2 py-1 text-[10px] font-bold text-sky">
                Book
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating chips */}
      <FloatingChip
        className="-left-4 top-6 sm:-left-8"
        icon={<CalendarCheck size={17} />}
        tone="bg-online/15 text-online"
        title="Booking confirmed"
        sub="Today at 2:00 PM"
        drift={-1}
        delay={0.2}
      />
      <FloatingChip
        className="-right-3 top-1/3 sm:-right-7"
        icon={<FileText size={17} />}
        tone="bg-sky/15 text-sky"
        title="Prescription ready"
        sub="Sent to your inbox"
        drift={1}
        delay={0.6}
      />
      <FloatingChip
        className="-left-3 bottom-8 sm:-left-6"
        icon={<Star size={17} className="fill-amber" />}
        tone="bg-amber/15 text-amber"
        title="4.9 rating"
        sub="8,200 reviews"
        drift={1}
        delay={1}
      />
    </div>
  );
}

function FloatingChip({
  className,
  icon,
  tone,
  title,
  sub,
  drift,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  tone: string;
  title: string;
  sub: string;
  drift: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, drift * 13, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={cn(
        "absolute z-10 hidden items-center gap-2.5 rounded-2xl border border-border bg-surface p-3 shadow-xl shadow-navy/10 sm:flex",
        className,
      )}
    >
      <span className={cn("grid h-9 w-9 place-items-center rounded-lg", tone)}>
        {icon}
      </span>
      <div>
        <p className="text-[13px] font-extrabold leading-tight">{title}</p>
        <p className="text-[11px] text-muted">{sub}</p>
      </div>
    </motion.div>
  );
}
