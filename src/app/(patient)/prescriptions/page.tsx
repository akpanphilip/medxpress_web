"use client";

import { useState } from "react";
import {
  Pill,
  FileText,
  Download,
  Stethoscope,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { prescriptions, testResults } from "@/lib/data";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/motion/Reveal";

const resultStatus = {
  normal: { tone: "online" as const, icon: CheckCircle2, label: "Normal" },
  review: { tone: "amber" as const, icon: AlertCircle, label: "Needs review" },
  pending: { tone: "neutral" as const, icon: Clock, label: "Pending" },
};

export default function PrescriptionsPage() {
  const [tab, setTab] = useState<"prescriptions" | "results">("prescriptions");
  const dispatch = useAppDispatch();

  const download = (name: string) =>
    dispatch(showToast({ message: `Downloading ${name}.pdf`, tone: "info" }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold">
          Prescriptions & results
        </h1>
        <p className="text-sm text-muted">
          Your medications and lab reports, all in one place.
        </p>
      </div>

      <div className="flex max-w-md gap-1 rounded-xl border border-border bg-surface p-1">
        {(
          [
            { id: "prescriptions", label: "Prescriptions", icon: Pill },
            { id: "results", label: "Test results", icon: FileText },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-bold transition ${
              tab === t.id
                ? "bg-gradient-to-r from-sky to-sky-600 text-white shadow-lg shadow-sky/30"
                : "text-muted hover:text-foreground"
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "prescriptions" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {prescriptions.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between border-b border-border bg-surface-2/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
                      <Stethoscope size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{p.diagnosis}</p>
                      <p className="text-xs text-muted">
                        {p.doctorName} | {p.date}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => download(`prescription-${p.id}`)}
                    className="press grid h-10 w-10 place-items-center rounded-lg border border-border text-muted transition hover:border-sky hover:text-sky"
                    aria-label="Download prescription"
                  >
                    <Download size={17} />
                  </button>
                </div>
                <div className="space-y-2 p-5">
                  {p.medicines.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center gap-3 rounded-xl bg-surface-2 p-3"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky/10 text-sky">
                        <Pill size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{m.name}</p>
                        <p className="text-xs text-muted">{m.dosage}</p>
                      </div>
                      <Badge tone="neutral">{m.duration}</Badge>
                    </div>
                  ))}
                  {p.notes && (
                    <p className="rounded-xl bg-sky/5 p-3 text-xs text-muted">
                      <span className="font-bold text-foreground">
                        Doctor&apos;s note:{" "}
                      </span>
                      {p.notes}
                    </p>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      )}

      {tab === "results" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testResults.map((r, i) => {
            const meta = resultStatus[r.status];
            const Icon = meta.icon;
            return (
              <Reveal key={r.id} delay={(i % 3) * 0.07}>
                <Card className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-red/10 text-red">
                      <FlaskConical size={22} />
                    </div>
                    <button
                      onClick={() => download(r.name.replace(/\s+/g, "-"))}
                      disabled={r.status === "pending"}
                      className="press grid h-9 w-9 place-items-center rounded-lg border border-border text-muted transition hover:border-sky hover:text-sky disabled:opacity-40"
                      aria-label="Download result"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  <p className="mt-3 font-bold">{r.name}</p>
                  <p className="text-xs text-muted">
                    {r.lab} | {r.date}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge tone={meta.tone}>
                      <Icon size={11} /> {meta.label}
                    </Badge>
                    <span className="text-[11px] text-muted">
                      {r.fileSize}
                    </span>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
