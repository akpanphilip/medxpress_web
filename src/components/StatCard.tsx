import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

type Tone = "sky" | "red" | "online" | "amber" | "violet";

const toneTile: Record<Tone, string> = {
  sky: "bg-gradient-to-br from-sky to-sky-600",
  red: "bg-gradient-to-br from-red to-red-600",
  online: "bg-gradient-to-br from-online to-[#16a34a]",
  amber: "bg-gradient-to-br from-amber to-[#e08c0b]",
  violet: "bg-gradient-to-br from-violet to-[#5b4ed8]",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaUp,
  tone = "sky",
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  delta?: string;
  deltaUp?: boolean;
  tone?: Tone;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg",
            toneTile[tone],
          )}
        >
          <Icon size={22} />
        </div>
        {delta && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
              deltaUp ? "bg-online/12 text-online" : "bg-red/12 text-red",
            )}
          >
            {deltaUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-extrabold leading-none">
        {value}
      </p>
      <p className="mt-1.5 text-sm text-muted">{label}</p>
    </Card>
  );
}
