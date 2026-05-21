import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const markSize = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-16 w-16" };
const iconSize = { sm: 18, md: 22, lg: 32 };
const textSize = { sm: "text-lg", md: "text-xl", lg: "text-3xl" };

export default function Logo({
  size = "md",
  withText = true,
  light = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl bg-gradient-to-br from-sky to-sky-700 shadow-lg shadow-sky/40",
          markSize[size],
        )}
      >
        <Activity
          size={iconSize[size]}
          strokeWidth={2.8}
          className="text-white"
        />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-surface bg-red" />
      </div>
      {withText && (
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            textSize[size],
          )}
        >
          <span className={light ? "text-white" : "text-foreground"}>MED</span>
          <span className="text-sky">XPRESS</span>
        </span>
      )}
    </div>
  );
}
