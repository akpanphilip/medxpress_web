"use client";

import { Wallet, Video, Star, CheckCircle2, TrendingUp } from "lucide-react";
import {
  consultationVolume,
  revenueTrend,
  specialties,
  adminStats,
} from "@/lib/data";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import StatCard from "@/components/StatCard";
import BarChart from "@/components/BarChart";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Reveal from "@/components/motion/Reveal";

export default function AdminAnalyticsPage() {
  const maxSpecialty = Math.max(...specialties.map((s) => s.count));
  const totalConsults = consultationVolume.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Analytics dashboard
        </h1>
        <p className="text-sm text-muted">
          Consultation volume, revenue and specialty performance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Wallet,
            label: "Revenue (month)",
            value: formatMoney(adminStats.revenue),
            delta: "12%",
            tone: "amber" as const,
          },
          {
            icon: Video,
            label: "Consults (week)",
            value: totalConsults.toLocaleString(),
            delta: "14%",
            tone: "sky" as const,
          },
          {
            icon: Star,
            label: "Avg. rating",
            value: "4.8",
            delta: "0.2",
            tone: "violet" as const,
          },
          {
            icon: CheckCircle2,
            label: "Completion rate",
            value: "96%",
            delta: "3%",
            tone: "online" as const,
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
            <h2 className="font-display text-lg font-extrabold">
              Consultation volume
            </h2>
            <p className="text-sm text-muted">
              Daily consultations, last 7 days
            </p>
            <div className="mt-4">
              <BarChart data={consultationVolume} tone="sky" height={200} />
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="p-5">
            <h2 className="font-display text-lg font-extrabold">
              Revenue trend
            </h2>
            <p className="text-sm text-muted">
              Monthly revenue in thousands of Naira
            </p>
            <div className="mt-4">
              <BarChart
                data={revenueTrend}
                tone="violet"
                unit="N"
                height={200}
              />
            </div>
          </Card>
        </Reveal>
      </div>

      <Reveal>
        <Card className="p-5">
          <h2 className="font-display text-lg font-extrabold">
            Consultations by specialty
          </h2>
          <p className="text-sm text-muted">
            Where patients are spending their consultations.
          </p>
          <div className="mt-4 space-y-3">
            {[...specialties]
              .sort((a, b) => b.count - a.count)
              .map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky/10 text-sky">
                    <DynamicIcon name={s.icon} size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-bold">{s.name}</span>
                      <span className="text-muted">{s.count} doctors</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky to-sky-600"
                        style={{
                          width: `${(s.count / maxSpecialty) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </Reveal>

      <Reveal>
        <Card className="flex items-center gap-3 p-5">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-online to-[#16a34a] text-white shadow-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="font-bold">Platform is growing steadily</p>
            <p className="text-sm text-muted">
              Consultations rose 14% this week, with Friday as the busiest day.
            </p>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
