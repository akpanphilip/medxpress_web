"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearToast } from "@/store/uiSlice";

const icons = {
  success: <CheckCircle2 size={18} className="text-online" />,
  info: <Info size={18} className="text-sky" />,
  error: <AlertCircle size={18} className="text-red" />,
};

export default function Toaster() {
  const toast = useAppSelector((s) => s.ui.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => dispatch(clearToast()), 2900);
    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-[120] -translate-x-1/2">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3.5 shadow-2xl shadow-navy/20"
          >
            {icons[toast.tone]}
            <p className="text-sm font-semibold text-foreground">
              {toast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
