"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  User,
  Camera,
  LogOut,
  Bell,
  Moon,
  ShieldCheck,
  Heart,
  Save,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateProfile, logout } from "@/store/authSlice";
import { showToast } from "@/store/uiSlice";
import { roleLabel } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        on ? "bg-sky" : "bg-border"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default function PatientProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "+234 803 555 0142",
  });
  const [prefs, setPrefs] = useState({
    reminders: true,
    results: true,
    promos: false,
  });

  const save = () => {
    dispatch(updateProfile(form));
    dispatch(
      showToast({ message: "Profile updated successfully", tone: "success" }),
    );
  };
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
          <div className="-mt-12 flex flex-wrap items-end gap-4">
            <div className="relative">
              <Avatar
                src={user?.avatar}
                name={user?.name ?? "User"}
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
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-extrabold">
                  {user?.name}
                </h2>
                <Badge tone="sky">{roleLabel(user?.role ?? "patient")}</Badge>
              </div>
              <p className="text-sm text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal info */}
        <Card className="space-y-4 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <User size={18} className="text-sky" /> Personal information
          </h3>
          <Input
            id="p-name"
            label="Full name"
            icon={<User size={17} />}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            id="p-email"
            label="Email address"
            type="email"
            icon={<Mail size={17} />}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            id="p-phone"
            label="Phone number"
            type="tel"
            icon={<Phone size={17} />}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Button onClick={save} fullWidth>
            <Save size={16} /> Save changes
          </Button>
        </Card>

        {/* Medical info */}
        <Card className="space-y-4 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Heart size={18} className="text-red" /> Medical information
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Blood group", value: "O+" },
              { label: "Genotype", value: "AA" },
              { label: "Allergies", value: "Penicillin" },
              { label: "Height", value: "1.68 m" },
              { label: "Weight", value: "68.4 kg" },
              { label: "Emergency contact", value: "+234 803 555 0190" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-surface-2 p-3">
                <p className="text-xs text-muted">{m.label}</p>
                <p className="text-sm font-bold">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-online/10 p-3 text-xs font-semibold text-online">
            <ShieldCheck size={15} /> Your medical data is encrypted and
            private.
          </div>
        </Card>
      </div>

      {/* Preferences */}
      <Card className="divide-y divide-border p-0">
        <div className="flex items-center gap-3 p-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
            <Moon size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Dark mode</p>
            <p className="text-xs text-muted">Switch the app theme</p>
          </div>
          <Toggle
            on={resolvedTheme === "dark"}
            onChange={(v) => setTheme(v ? "dark" : "light")}
          />
        </div>
        {[
          { key: "reminders", label: "Appointment reminders", desc: "Alerts before your visits" },
          { key: "results", label: "Test result alerts", desc: "When new results are ready" },
          { key: "promos", label: "Promotions", desc: "Offers and health tips" },
        ].map((p) => (
          <div key={p.key} className="flex items-center gap-3 p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky/10 text-sky">
              <Bell size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">{p.label}</p>
              <p className="text-xs text-muted">{p.desc}</p>
            </div>
            <Toggle
              on={prefs[p.key as keyof typeof prefs]}
              onChange={(v) => setPrefs({ ...prefs, [p.key]: v })}
            />
          </div>
        ))}
      </Card>

      <Button variant="outline" fullWidth onClick={signOut}>
        <LogOut size={16} /> Sign out
      </Button>
    </div>
  );
}
