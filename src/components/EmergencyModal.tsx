"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Phone, Video, X, Siren, ChevronRight } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeEmergency } from "@/store/uiSlice";
import { doctors } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import StatusDot from "@/components/ui/StatusDot";

export default function EmergencyModal() {
  const open = useAppSelector((s) => s.ui.emergencyOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onlineDoctors = doctors.filter((d) => d.status === "online").slice(0, 3);
  const close = () => dispatch(closeEmergency());
  const startConsult = (id: string) => {
    close();
    router.push(`/consultation/${id}?type=emergency`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
        >
          <button
            aria-label="Close emergency panel"
            onClick={close}
            className="absolute inset-0 bg-navy/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-red to-red-600 p-6 text-white">
              <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10" />
              <div className="relative flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                  <Siren size={26} />
                </div>
                <div>
                  <h2 className="font-display text-xl font-extrabold">
                    Emergency Care
                  </h2>
                  <p className="text-sm text-white/85">
                    Get urgent help in seconds.
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <a
                href="tel:112"
                onClick={close}
                className="press flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red to-red-600 p-4 text-white shadow-lg shadow-red/30"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Call the emergency line</p>
                  <p className="text-sm text-white/85">
                    Dial 112 for an ambulance now
                  </p>
                </div>
                <ChevronRight size={20} />
              </a>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                  Or connect to a doctor instantly
                </p>
                <div className="space-y-2">
                  {onlineDoctors.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => startConsult(d.id)}
                      className="press flex w-full items-center gap-3 rounded-2xl border border-border bg-surface-2 p-3 text-left transition hover:border-red/40"
                    >
                      <div className="relative">
                        <Avatar src={d.avatar} name={d.name} size={44} />
                        <StatusDot
                          status={d.status}
                          className="absolute -bottom-0.5 -right-0.5"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{d.name}</p>
                        <p className="text-xs text-muted">{d.specialty}</p>
                      </div>
                      <span className="flex items-center gap-1 rounded-lg bg-red/10 px-2.5 py-1.5 text-xs font-bold text-red">
                        <Video size={14} /> Consult
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
