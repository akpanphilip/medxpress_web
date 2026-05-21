"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Star,
  Users,
  Award,
  Languages,
  Siren,
  CalendarDays,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";
import type { Doctor } from "@/lib/types";
import { formatMoney, personAvatar } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import StatusDot from "@/components/ui/StatusDot";
import SmartImage from "@/components/ui/SmartImage";
import { StarRow } from "@/components/ui/Rating";

type Tab = "about" | "reviews" | "schedule";

export default function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("about");
  const [activeDay, setActiveDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const day = doctor.availability[activeDay];

  const stats = [
    { icon: Star, label: "Rating", value: doctor.rating.toFixed(1) },
    { icon: Users, label: "Patients", value: doctor.patients.toLocaleString() },
    { icon: Award, label: "Experience", value: `${doctor.experience} yrs` },
    { icon: Star, label: "Reviews", value: String(doctor.reviewCount) },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.back()}
        className="press flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-sky"
      >
        <ArrowLeft size={18} /> Back to doctors
      </button>

      {/* Header */}
      <Card className="overflow-hidden">
        <div className="relative h-36 bg-gradient-to-br from-sky via-sky-600 to-violet sm:h-44">
          <div className="grid-pattern absolute inset-0 text-white/10" />
        </div>
        <div className="px-5 pb-5 sm:px-7">
          <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="relative">
              <Avatar
                src={doctor.avatar}
                name={doctor.name}
                size={112}
                className="rounded-3xl ring-4 ring-surface"
              />
              <StatusDot
                status={doctor.status}
                className="absolute -bottom-1 -right-1"
              />
            </div>
            <div className="flex-1 pb-1">
              <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold">
                {doctor.name}
                {doctor.verified && (
                  <BadgeCheck size={20} className="text-sky" />
                )}
              </h1>
              <p className="font-semibold text-sky">{doctor.specialty}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="flex items-center gap-1">
                  <Building2 size={14} /> {doctor.hospital}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {doctor.location}
                </span>
                <StatusDot status={doctor.status} withLabel />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-surface-2/50 p-3.5 text-center"
              >
                <s.icon size={17} className="mx-auto text-sky" />
                <p className="mt-1.5 font-display text-lg font-extrabold">
                  {s.value}
                </p>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Tabs */}
          <div className="flex gap-1 rounded-xl border border-border bg-surface p-1">
            {(
              [
                { id: "about", label: "About" },
                { id: "reviews", label: "Reviews" },
                { id: "schedule", label: "Schedule" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition ${
                  tab === t.id
                    ? "bg-gradient-to-r from-sky to-sky-600 text-white shadow-lg shadow-sky/30"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "about" && (
            <div className="space-y-5 fade-up">
              <Card className="p-5">
                <h3 className="font-display text-lg font-extrabold">
                  About {doctor.name.split(" ")[1]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {doctor.about}
                </p>
              </Card>
              <Card className="p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                  <Award size={18} className="text-sky" /> Credentials
                </h3>
                <ul className="mt-3 space-y-2">
                  {doctor.credentials.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 rounded-xl bg-surface-2/60 px-3 py-2.5 text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-online"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2">
                  <Languages size={16} className="text-sky" />
                  {doctor.languages.map((l) => (
                    <span
                      key={l}
                      className="rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-bold"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {tab === "reviews" && (
            <div className="space-y-4 fade-up">
              <Card className="flex items-center gap-5 p-5">
                <div className="text-center">
                  <p className="font-display text-5xl font-extrabold text-sky">
                    {doctor.rating.toFixed(1)}
                  </p>
                  <StarRow value={doctor.rating} />
                </div>
                <div className="flex-1 border-l border-border pl-5">
                  <p className="font-bold">
                    {doctor.reviewCount} verified reviews
                  </p>
                  <p className="text-sm text-muted">
                    From patients who completed a consultation.
                  </p>
                </div>
              </Card>
              {doctor.reviews.map((r) => (
                <Card key={r.id} className="p-5">
                  <div className="flex items-center gap-3">
                    <Avatar src={r.avatar} name={r.patient} size={42} />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{r.patient}</p>
                      <p className="text-xs text-muted">{r.date}</p>
                    </div>
                    <StarRow value={r.rating} size={13} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {r.comment}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {tab === "schedule" && (
            <Card className="space-y-4 p-5 fade-up">
              <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                <CalendarDays size={18} className="text-sky" /> Real-time
                availability
              </h3>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                {doctor.availability.map((d, i) => (
                  <button
                    key={d.date}
                    onClick={() => {
                      setActiveDay(i);
                      setSlot(null);
                    }}
                    className={`flex shrink-0 flex-col items-center rounded-xl border-2 px-4 py-2.5 transition ${
                      activeDay === i
                        ? "border-sky bg-sky/10"
                        : "border-border hover:border-sky/40"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        activeDay === i ? "text-sky" : "text-muted"
                      }`}
                    >
                      {d.day}
                    </span>
                    <span className="text-sm font-extrabold">
                      {d.date.split(" ")[1]}
                    </span>
                  </button>
                ))}
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                  <Clock size={13} /> {day.slots.length} slots on {day.day}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {day.slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={`rounded-lg border py-2 text-sm font-bold transition ${
                        slot === s
                          ? "border-sky bg-sky text-white"
                          : "border-border hover:border-sky"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                href={
                  slot
                    ? `/booking/${doctor.id}?day=${activeDay}&slot=${slot}`
                    : `/booking/${doctor.id}`
                }
                fullWidth
                size="lg"
              >
                {slot ? `Book ${day.day} at ${slot}` : "Choose a time to book"}
              </Button>
            </Card>
          )}
        </div>

        {/* Sticky booking sidebar */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden">
            <div className="relative h-28 overflow-hidden">
              <SmartImage
                src={personAvatar(doctor.name)}
                alt={doctor.name}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Consultation fee
                </p>
                <p className="font-display text-3xl font-extrabold">
                  {formatMoney(doctor.fee)}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-sky/10 px-3 py-2.5 text-sm font-bold text-sky">
                <Clock size={15} /> Next available: {doctor.nextAvailable}
              </div>
              <Button href={`/booking/${doctor.id}`} fullWidth size="lg">
                <CalendarDays size={18} /> Book Consultation
              </Button>
              <Button
                variant="danger"
                fullWidth
                size="lg"
                onClick={() =>
                  router.push(`/consultation/${doctor.id}?type=emergency`)
                }
              >
                <Siren size={18} /> Emergency Consult
              </Button>
              <p className="text-center text-xs text-muted">
                Free cancellation up to 1 hour before your appointment.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
