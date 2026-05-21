import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
  interactive,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface",
        interactive &&
          "press transition duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-xl hover:shadow-sky/10",
        className,
      )}
    >
      {children}
    </div>
  );
}
