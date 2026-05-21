"use client";

import Link from "next/link";
import {
  CalendarDays,
  Pill,
  FileText,
  Video,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  HeartPulse,
  Activity,
  ChevronRight,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  healthMetrics,
  appointments,
  prescriptions,
  testResults,
} from "@/lib/data";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/StatCard";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Reveal from "@/components/motion/Reveal";

const trendIcon = { up: TrendingUp, down: TrendingDown, stable: Minus };
const statusColor = {
  good: "text-online",
  watch: "text-amber",
  alert: "text-red",
};

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function PatientDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const upcoming = appointments.filter((a) => a.status === "upcoming");
  const nextVisit = upcoming[0];

  return (
    <div className="space-y-7">
      {/* Welcome banner */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-700 to-navy p-6 text-white sm:p-8">
          <div className="aurora pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sky/30" />
          <div className="grid-pattern pointer-events-none absolute inset-0 text-white/[0.05]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-white/65">
                {greeting()}, {user?.name.split(" ")[0]}
              </p>
              <h1 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
                Your health, on track.
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/70">
                You have {upcoming.length} upcoming consultation
                {upcoming.length === 1 ? "" : "s"} and{" "}
                {prescriptions.length} active prescriptions.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button href="/discover" size="md">
                  Find a doctor <ArrowRight size={16} />
                </Button>
                <Button href="/appointments" variant="glass" size="md">
                  My appointments
                </Button>
              </div>
            </div>
            {nextVisit && (
              <div className="glass shrink-0 rounded-2xl border border-white/15 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                  Next consultation
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Avatar
                    src={nextVisit.doctorAvatar}
                    name={nextVisit.doctorName}
                    size={46}
                    className="rounded-xl"
                  />
                  <div>
                    <p className="text-sm font-bold">
                      {nextVisit.doctorName}
                    </p>
                    <p className="text-xs text-white/65">
                      {nextVisit.date}, {nextVisit.time}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/consultation/${nextVisit.doctorId}`}
                  className="press mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-sm font-extrabold text-navy"
                >
                  <Video size={15} /> Join now
                </Link>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: CalendarDays, label: "Upcoming visits", value: String(upcoming.length), tone: "sky" as const },
          { icon: Pill, label: "Prescriptions", value: String(prescriptions.length), tone: "violet" as const },
          { icon: FileText, label: "Test results", value: String(testResults.length), tone: "amber" as const },
          { icon: HeartPulse, label: "Health score", value: "92%", tone: "online" as const },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <StatCard {...s} />
          </Reveal>
        ))}
      </div>

      {/* Health metrics */}
      <Reveal>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold">
            Health metrics
          </h2>
          <span className="flex items-center gap-1 text-xs font-semibold text-online">
            <Activity size={13} /> Updated today
          </span>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {healthMetrics.map((m, i) => {
          const Trend = trendIcon[m.trend];
          return (
            <Reveal key={m.id} delay={i * 0.06}>
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky/10 text-sky">
                    <DynamicIcon name={m.icon} size={20} />
                  </div>
                  <Trend size={16} className={statusColor[m.status]} />
                </div>
                <p className="mt-3 font-display text-2xl font-extrabold">
                  {m.value}
                  <span className="ml-1 text-xs font-semibold text-muted">
                    {m.unit}
                  </span>
                </p>
                <p className="text-sm text-muted">{m.label}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Two columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold">
                Upcoming appointments
              </h2>
              <Link
                href="/appointments"
                className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
              >
                See all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="space-y-3">
              {upcoming.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/50 p-3.5"
                >
                  <Avatar
                    src={a.doctorAvatar}
                    name={a.doctorName}
                    size={48}
                    className="rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">
                      {a.doctorName}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {a.specialty} | {a.date} at {a.time}
                    </p>
                  </div>
                  <Button href={`/consultation/${a.doctorId}`} size="sm">
                    <Video size={14} /> Join
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-5">
            <h2 className="mb-4 font-display text-lg font-extrabold">
              Recent prescriptions
            </h2>
            <div className="space-y-3">
              {prescriptions.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-border bg-surface-2/50 p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{p.diagnosis}</p>
                    <Badge tone="violet">{p.medicines.length}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">
                    {p.doctorName} | {p.date}
                  </p>
                </div>
              ))}
            </div>
            <Button
              href="/prescriptions"
              variant="outline"
              fullWidth
              className="mt-4"
            >
              View all prescriptions
            </Button>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
