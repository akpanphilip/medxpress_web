"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarDays,
  Pill,
  User,
  Users,
  BadgeCheck,
  ChartColumnBig,
  CalendarClock,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/lib/types";
import { cn, roleLabel } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import Logo from "@/components/ui/Logo";
import Avatar from "@/components/ui/Avatar";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: Record<Role, NavItem[]> = {
  patient: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/discover", label: "Find Doctors", icon: Stethoscope },
    { href: "/appointments", label: "Appointments", icon: CalendarDays },
    { href: "/prescriptions", label: "Prescriptions", icon: Pill },
    { href: "/profile", label: "My Profile", icon: User },
  ],
  doctor: [
    { href: "/doctor", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/doctor/schedule", label: "Schedule", icon: CalendarClock },
    { href: "/doctor/patients", label: "Patients", icon: Users },
    { href: "/doctor/profile", label: "My Profile", icon: User },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
    { href: "/admin/doctors", label: "Verifications", icon: BadgeCheck },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/analytics", label: "Analytics", icon: ChartColumnBig },
  ],
};

const NOTIFICATIONS = [
  { title: "Appointment reminder", body: "Video consult at 2:00 PM today.", time: "10m", tone: "sky" },
  { title: "New prescription", body: "Dr. Mensah issued a prescription.", time: "1h", tone: "online" },
  { title: "Test result ready", body: "Your Lipid Profile is available.", time: "3h", tone: "amber" },
];

function isActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function Loader() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy">
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky to-sky-600">
        <span className="pulse-ring absolute inset-0 rounded-2xl bg-sky" />
        <Activity size={30} strokeWidth={2.8} className="relative text-white" />
      </div>
    </div>
  );
}

export default function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);

  const items = NAV[role];
  const current = items.find((i) => isActive(pathname, i));

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  useEffect(() => {
    setDrawer(false);
    setMenu(false);
    setBell(false);
  }, [pathname]);

  if (!hydrated) return <Loader />;
  if (!user) return null;

  const signOut = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link href={items[0].href}>
          <Logo size="sm" />
        </Link>
        <button
          onClick={() => setDrawer(false)}
          className="press grid h-9 w-9 place-items-center rounded-lg text-muted lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pb-2 pt-2">
        <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-muted">
          {roleLabel(role)} workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const active = isActive(pathname, item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition",
                active
                  ? "bg-gradient-to-r from-sky to-sky-600 text-white shadow-lg shadow-sky/30"
                  : "text-muted hover:bg-surface-2 hover:text-foreground",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <div className="rounded-2xl border border-border bg-surface-2 p-3">
          <div className="flex items-center gap-2.5">
            <Avatar src={user.avatar} name={user.name} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="press mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-surface py-2 text-xs font-bold text-red transition hover:border-red/40"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-surface lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-surface lg:hidden"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setDrawer(true)}
            className="press grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-extrabold leading-tight">
              {current?.label ?? "Dashboard"}
            </h1>
            <p className="text-xs text-muted">
              Welcome back, {user.name.split(" ")[0]}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setBell((v) => !v);
                  setMenu(false);
                }}
                className="press relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface transition hover:border-sky hover:text-sky"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-surface bg-red" />
              </button>
              <AnimatePresence>
                {bell && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-border px-4 py-3">
                      <p className="text-sm font-bold">Notifications</p>
                      <span className="rounded-full bg-red/10 px-2 py-0.5 text-[11px] font-bold text-red">
                        3 new
                      </span>
                    </div>
                    {NOTIFICATIONS.map((n) => (
                      <div
                        key={n.title}
                        className="flex gap-3 border-b border-border px-4 py-3 last:border-0"
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                            n.tone === "sky" && "bg-sky",
                            n.tone === "online" && "bg-online",
                            n.tone === "amber" && "bg-amber",
                          )}
                        />
                        <div>
                          <p className="text-sm font-bold">{n.title}</p>
                          <p className="text-xs text-muted">{n.body}</p>
                        </div>
                        <span className="ml-auto text-[11px] text-muted">
                          {n.time}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setMenu((v) => !v);
                  setBell(false);
                }}
                className="press flex items-center gap-2 rounded-xl border border-border bg-surface py-1.5 pl-1.5 pr-2.5 transition hover:border-sky"
              >
                <Avatar src={user.avatar} name={user.name} size={30} />
                <span className="hidden text-sm font-bold sm:block">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={15} className="text-muted" />
              </button>
              <AnimatePresence>
                {menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
                  >
                    <div className="flex items-center gap-3 border-b border-border p-4">
                      <Avatar src={user.avatar} name={user.name} size={42} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted">
                          {roleLabel(user.role)}
                        </p>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-surface-2"
                      >
                        <Users size={16} className="text-muted" /> Switch
                        account
                      </Link>
                      <button
                        onClick={signOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red transition hover:bg-red/10"
                      >
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {(menu || bell) && (
          <button
            aria-label="Close"
            tabIndex={-1}
            onClick={() => {
              setMenu(false);
              setBell(false);
            }}
            className="fixed inset-0 z-20 cursor-default"
          />
        )}

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
