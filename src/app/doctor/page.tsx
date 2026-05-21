"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Users,
  Wallet,
  Star,
  Video,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { patientQueue, earningsTrend, doctorStats, getDoctor } from "@/lib/data";
import type { DoctorStatus } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import { StarRow } from "@/components/ui/Rating";
import Reveal from "@/components/motion/Reveal";

const statusOptions: { id: DoctorStatus; label: string; color: string }[] = [
  { id: "online", label: "Online", color: "bg-online" },
  { id: "busy", label: "Busy", color: "bg-red" },
  { id: "offline", label: "Offline", color: "bg-muted" },
];

export default function DoctorDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [status, setStatus] = useState<DoctorStatus>("online");
  const profile = getDoctor("d1");

  const waiting = patientQueue.filter((q) => q.status !== "done");
  const done = patientQueue.filter((q) => q.status === "done");

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold">
            Welcome back, {user?.name.split(" ")[1] ?? "Doctor"}
          </h1>
          <p className="text-sm text-muted">
            You have {waiting.length} consultations remaining today.
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
          {statusOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                status === s.id ? "bg-surface-2 text-foreground" : "text-muted"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${s.color}`} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: CalendarCheck,
            label: "Today's consults",
            value: String(doctorStats.todayConsults),
            delta: "2 more",
            tone: "sky" as const,
          },
          {
            icon: Users,
            label: "Total patients",
            value: doctorStats.totalPatients.toLocaleString(),
            delta: "8%",
            tone: "violet" as const,
          },
          {
            icon: Wallet,
            label: "This month",
            value: formatMoney(doctorStats.monthEarnings),
            delta: "12%",
            tone: "online" as const,
          },
          {
            icon: Star,
            label: "Avg. rating",
            value: doctorStats.rating.toFixed(1),
            delta: "0.1",
            tone: "amber" as const,
          },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <StatCard {...s} deltaUp />
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Queue */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-extrabold">
              Today&apos;s schedule
            </h2>
            <Link
              href="/doctor/schedule"
              className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
            >
              Full schedule <ChevronRight size={15} />
            </Link>
          </div>

          {waiting.map((q, i) => (
            <Reveal key={q.id} delay={i * 0.06}>
              <Card className="p-5">
                <div className="flex gap-3">
                  <Avatar
                    src={q.avatar}
                    name={q.patient}
                    size={52}
                    className="rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold">{q.patient}</p>
                        <p className="text-xs text-muted">
                          {q.age} yrs |{" "}
                          {q.type === "video" ? "Video call" : "Chat"}
                        </p>
                      </div>
                      {q.status === "waiting" ? (
                        <Badge tone="red" dot pulse>
                          Waiting
                        </Badge>
                      ) : (
                        <Badge tone="sky">{q.time}</Badge>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{q.reason}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 border-t border-border pt-4">
                  <Button href="/consultation/d1" size="sm">
                    {q.type === "video" ? (
                      <Video size={15} />
                    ) : (
                      <MessageSquare size={15} />
                    )}
                    Start consultation
                  </Button>
                  <Button href="/doctor/patients" variant="outline" size="sm">
                    Patient history
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}

          {done.map((q) => (
            <Card
              key={q.id}
              className="flex items-center gap-3 p-4 opacity-70"
            >
              <Avatar
                src={q.avatar}
                name={q.patient}
                size={42}
                className="rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{q.patient}</p>
                <p className="text-xs text-muted">{q.time}</p>
              </div>
              <Badge tone="online">
                <CheckCircle2 size={11} /> Completed
              </Badge>
            </Card>
          ))}
        </div>

        {/* Side */}
        <div className="space-y-6">
          <Reveal>
            <Card className="p-5">
              <h2 className="font-display text-lg font-extrabold">
                Earnings this week
              </h2>
              <p className="text-sm text-muted">
                {formatMoney(earningsTrend.reduce((s, d) => s + d.value, 0))}{" "}
                total
              </p>
              <div className="mt-4">
                <BarChart
                  data={earningsTrend}
                  tone="sky"
                  unit="N"
                  height={150}
                />
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-5">
              <h2 className="font-display text-lg font-extrabold">
                Recent reviews
              </h2>
              <div className="mt-3 space-y-3">
                {profile?.reviews.slice(0, 2).map((r) => (
                  <div key={r.id} className="rounded-xl bg-surface-2 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">{r.patient}</p>
                      <StarRow value={r.rating} size={12} />
                    </div>
                    <p className="mt-1 text-xs text-muted">{r.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
