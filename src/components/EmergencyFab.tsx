"use client";

import { Siren } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { openEmergency } from "@/store/uiSlice";

/** Persistent emergency access, always one click away from every screen. */
export default function EmergencyFab() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // The live consultation screen has its own emergency-capable controls.
  if (pathname?.startsWith("/consultation")) return null;

  return (
    <button
      type="button"
      onClick={() => dispatch(openEmergency())}
      aria-label="Open emergency care"
      className="press fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-red to-red-600 py-3.5 pl-3.5 pr-5 text-white shadow-xl shadow-red/40"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <Siren size={20} className="relative" />
      </span>
      <span className="text-sm font-extrabold uppercase tracking-wide">
        Emergency
      </span>
    </button>
  );
}
