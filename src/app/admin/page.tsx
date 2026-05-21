"use client";

import Link from "next/link";
import {
  Stethoscope,
  Users,
  Video,
  Wallet,
  Siren,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import {
  adminStats,
  consultationVolume,
  revenueTrend,
  pendingDoctors,
  doctors,
} from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import Reveal from "@/components/motion/Reveal";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Platform overview
        </h1>
        <p className="text-sm text-muted">
          Monitor consultations, revenue and doctor onboarding across
          MEDXPRESS.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Stethoscope,
            label: "Active doctors",
            value: String(adminStats.totalDoctors),
            delta: "6 new",
            tone: "sky" as const,
          },
          {
            icon: Users,
            label: "Total patients",
            value: adminStats.totalPatients.toLocaleString(),
            delta: "9%",
            tone: "violet" as const,
          },
          {
            icon: Video,
            label: "Consultations",
            value: adminStats.consultations.toLocaleString(),
            delta: "14%",
            tone: "online" as const,
          },
          {
            icon: Wallet,
            label: "Revenue (month)",
            value: formatMoney(adminStats.revenue),
            delta: "12%",
            tone: "amber" as const,
          },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <StatCard {...s} deltaUp />
          </Reveal>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-extrabold">
                  Consultation volume
                </h2>
                <p className="text-sm text-muted">Last 7 days</p>
              </div>
              <Badge tone="sky">
                <ArrowUpRight size={12} /> 14%
              </Badge>
            </div>
            <div className="mt-4">
              <BarChart data={consultationVolume} tone="sky" />
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-extrabold">
                  Revenue trend
                </h2>
                <p className="text-sm text-muted">Last 6 months (thousands)</p>
              </div>
              <Badge tone="red">
                <ArrowUpRight size={12} /> 12%
              </Badge>
            </div>
            <div className="mt-4">
              <BarChart data={revenueTrend} tone="red" unit="N" />
            </div>
          </Card>
        </Reveal>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold">
                Pending doctor verifications
              </h2>
              <Link
                href="/admin/doctors"
                className="flex items-center gap-0.5 text-sm font-bold text-sky hover:underline"
              >
                Review all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="space-y-2">
              {pendingDoctors.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-2xl bg-surface-2/60 p-3"
                >
                  <Avatar
                    src={d.avatar}
                    name={d.name}
                    size={44}
                    className="rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{d.name}</p>
                    <p className="truncate text-xs text-muted">
                      {d.specialty} | {d.submitted}
                    </p>
                  </div>
                  <Badge tone="amber">{d.documents} docs</Badge>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <Card className="flex items-center gap-3 p-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-red to-red-600 text-white shadow-lg">
                <Siren size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold">
                  {adminStats.emergencyToday}
                </p>
                <p className="text-sm text-muted">Emergency consults today</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.15}>
            <Card className="flex items-center gap-3 p-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-online to-[#16a34a] text-white shadow-lg">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold">
                  {doctors.length}
                </p>
                <p className="text-sm text-muted">Doctors online now</p>
              </div>
            </Card>
          </Reveal>
          <Button href="/admin/analytics" variant="outline" fullWidth>
            View full analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
