"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Stethoscope } from "lucide-react";
import { doctors, specialties } from "@/lib/data";
import { cn } from "@/lib/utils";
import DoctorCard from "@/components/DoctorCard";
import { DoctorCardSkeleton } from "@/components/ui/Skeleton";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Reveal from "@/components/motion/Reveal";

type SortKey = "rating" | "fee" | "experience";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "rating", label: "Top rated" },
  { key: "fee", label: "Lowest fee" },
  { key: "experience", label: "Most experienced" },
];

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <DiscoverInner />
    </Suspense>
  );
}

function DiscoverInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sort, setSort] = useState<SortKey>("rating");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = params.get("q");
    const sp = params.get("specialty");
    if (q) setQuery(q);
    if (sp) setSpecialty(sp);
  }, [params]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const specialtyName =
      specialty === "all"
        ? null
        : (specialties.find((s) => s.id === specialty)?.name ?? null);
    const q = query.trim().toLowerCase();

    let list = doctors.filter((d) => {
      if (specialtyName && d.specialty !== specialtyName) return false;
      if (onlineOnly && d.status !== "online") return false;
      if (
        q &&
        !d.name.toLowerCase().includes(q) &&
        !d.specialty.toLowerCase().includes(q) &&
        !d.hospital.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "fee") return a.fee - b.fee;
      return b.experience - a.experience;
    });
    return list;
  }, [query, specialty, sort, onlineOnly]);

  return (
    <div className="space-y-6">
      {/* Search banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky to-sky-700 p-6 text-white sm:p-8">
        <div className="aurora pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-white/20" />
        <div className="relative">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
            Find the right doctor for you
          </h1>
          <p className="mt-1 text-sm text-white/85">
            {doctors.length * 27}+ verified specialists, available now.
          </p>
          <div className="relative mt-4 max-w-xl">
            <Search
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, specialty or hospital"
              className="h-13 w-full rounded-2xl border border-white/20 bg-white pl-12 pr-4 text-sm font-medium text-navy outline-none placeholder:text-muted"
            />
          </div>
        </div>
      </div>

      {/* Specialty chips */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        <Chip
          active={specialty === "all"}
          onClick={() => setSpecialty("all")}
          label="All specialties"
        />
        {specialties.map((s) => (
          <Chip
            key={s.id}
            active={specialty === s.id}
            onClick={() => setSpecialty(s.id)}
            label={s.name}
            icon={s.icon}
          />
        ))}
      </div>

      {/* Sort row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setOnlineOnly((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition",
            onlineOnly
              ? "border-online bg-online/10 text-online"
              : "border-border bg-surface text-muted hover:border-online/50",
          )}
        >
          <span className="h-2 w-2 rounded-full bg-online" /> Available now
        </button>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-muted">
          <SlidersHorizontal size={14} /> Sort by
        </span>
        {sortOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSort(opt.key)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs font-bold transition",
              sort === opt.key
                ? "border-sky bg-sky/10 text-sky"
                : "border-border bg-surface text-muted hover:border-sky/50",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="text-sm font-semibold text-muted">
        {loading ? "Finding doctors..." : `${results.length} doctors available`}
      </p>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-surface-2 text-muted">
            <Stethoscope size={28} />
          </div>
          <p className="mt-3 font-bold">No doctors match your search</p>
          <p className="text-sm text-muted">Try a different specialty.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.08}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition",
        active
          ? "border-sky bg-sky text-white"
          : "border-border bg-surface text-muted hover:border-sky/50",
      )}
    >
      {icon && <DynamicIcon name={icon} size={14} />}
      {label}
    </button>
  );
}
