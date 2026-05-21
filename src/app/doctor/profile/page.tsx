"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Wallet,
  Award,
  Languages,
  BadgeCheck,
  Save,
  LogOut,
  Camera,
} from "lucide-react";
import type { DoctorStatus } from "@/lib/types";
import { getDoctor } from "@/lib/data";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { showToast } from "@/store/uiSlice";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";

const statusOptions: { id: DoctorStatus; label: string; color: string }[] = [
  { id: "online", label: "Online", color: "bg-online" },
  { id: "busy", label: "Busy", color: "bg-red" },
  { id: "offline", label: "Offline", color: "bg-muted" },
];

export default function DoctorProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const doctor = getDoctor("d1");

  const [form, setForm] = useState({
    name: user?.name ?? doctor?.name ?? "",
    specialty: doctor?.specialty ?? "",
    hospital: doctor?.hospital ?? "",
    location: doctor?.location ?? "",
    fee: String(doctor?.fee ?? 0),
    experience: String(doctor?.experience ?? 0),
    about: doctor?.about ?? "",
  });
  const [status, setStatus] = useState<DoctorStatus>("online");

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const signOut = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-extrabold">My profile</h1>

      <Card className="overflow-hidden">
        <div className="relative h-28 bg-gradient-to-br from-sky via-sky-600 to-violet">
          <div className="grid-pattern absolute inset-0 text-white/10" />
        </div>
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="relative">
              <Avatar
                src={doctor?.avatar}
                name={form.name}
                size={96}
                className="rounded-3xl ring-4 ring-surface"
              />
              <button
                onClick={() =>
                  dispatch(
                    showToast({
                      message: "Photo upload coming soon",
                      tone: "info",
                    }),
                  )
                }
                className="press absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-sky text-white ring-2 ring-surface"
                aria-label="Change photo"
              >
                <Camera size={15} />
              </button>
            </div>
            <Badge tone="online">
              <BadgeCheck size={12} /> Verified doctor
            </Badge>
          </div>
          <div className="mt-3">
            <h2 className="font-display text-xl font-extrabold">
              {form.name}
            </h2>
            <p className="text-sm font-semibold text-sky">{form.specialty}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-lg font-extrabold">
          Consultation status
        </h3>
        <p className="text-xs text-muted">
          Controls the indicator patients see on your profile.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {statusOptions.map((s) => (
            <button
              key={s.id}
              onClick={() => setStatus(s.id)}
              className={`press flex items-center justify-center gap-1.5 rounded-xl border-2 py-2.5 text-sm font-bold transition ${
                status === s.id
                  ? "border-sky bg-sky/10 text-sky"
                  : "border-border text-muted hover:border-sky/40"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
              {s.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4 p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Award size={18} className="text-sky" /> Professional details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="d-name"
              label="Full name"
              value={form.name}
              onChange={set("name")}
            />
            <Input
              id="d-specialty"
              label="Specialty"
              value={form.specialty}
              onChange={set("specialty")}
            />
            <Input
              id="d-hospital"
              label="Hospital or clinic"
              icon={<Building2 size={17} />}
              value={form.hospital}
              onChange={set("hospital")}
            />
            <Input
              id="d-location"
              label="Location"
              icon={<MapPin size={17} />}
              value={form.location}
              onChange={set("location")}
            />
            <Input
              id="d-fee"
              label="Consultation fee"
              inputMode="numeric"
              icon={<Wallet size={17} />}
              value={form.fee}
              onChange={set("fee")}
            />
            <Input
              id="d-exp"
              label="Years of experience"
              inputMode="numeric"
              value={form.experience}
              onChange={set("experience")}
            />
          </div>
          <TextArea
            id="d-about"
            label="About"
            rows={4}
            value={form.about}
            onChange={set("about")}
          />
          <Button
            fullWidth
            onClick={() =>
              dispatch(
                showToast({
                  message: "Profile updated successfully",
                  tone: "success",
                }),
              )
            }
          >
            <Save size={16} /> Save changes
          </Button>
        </Card>

        <Card className="space-y-3 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <BadgeCheck size={18} className="text-online" /> Credentials
          </h3>
          <ul className="space-y-2">
            {doctor?.credentials.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-sm"
              >
                <BadgeCheck size={15} className="shrink-0 text-online" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Languages size={16} className="text-sky" />
            {doctor?.languages.map((l) => (
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

      <Button variant="outline" fullWidth onClick={signOut}>
        <LogOut size={16} /> Sign out
      </Button>
    </div>
  );
}
