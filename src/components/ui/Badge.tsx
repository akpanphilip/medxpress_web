import { cn } from "@/lib/utils";

type Tone = "sky" | "red" | "online" | "amber" | "violet" | "neutral";

const tones: Record<Tone, string> = {
  sky: "bg-sky/12 text-sky",
  red: "bg-red/12 text-red",
  online: "bg-online/15 text-online",
  amber: "bg-amber/15 text-[#b27a14] dark:text-amber",
  violet: "bg-violet/15 text-violet",
  neutral: "bg-surface-2 text-muted",
};

const dotColor: Record<Tone, string> = {
  sky: "bg-sky",
  red: "bg-red",
  online: "bg-online",
  amber: "bg-amber",
  violet: "bg-violet",
  neutral: "bg-muted",
};

export default function Badge({
  tone = "neutral",
  dot,
  pulse,
  className,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotColor[tone],
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColor[tone],
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
