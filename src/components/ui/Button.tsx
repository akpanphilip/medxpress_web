import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "danger"
  | "outline"
  | "ghost"
  | "white"
  | "glass";
type Size = "sm" | "md" | "lg" | "xl";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-sky to-sky-600 text-white shadow-lg shadow-sky/35 hover:shadow-sky/50 hover:brightness-105",
  danger:
    "bg-gradient-to-r from-red to-red-600 text-white shadow-lg shadow-red/35 hover:brightness-105",
  outline:
    "border border-border bg-surface text-foreground hover:border-sky hover:text-sky",
  ghost: "text-foreground hover:bg-surface-2",
  white: "bg-white text-navy shadow-lg shadow-navy/20 hover:bg-white/90",
  glass:
    "glass border border-white/15 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-[15px] gap-2",
  xl: "h-14 px-8 text-base gap-2.5",
};

interface Base {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ActionProps extends Base {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

interface NavProps extends Base {
  href: string;
  target?: string;
  "aria-label"?: string;
}

export default function Button(props: ActionProps | NavProps) {
  const { variant = "primary", size = "md", fullWidth, className, children } =
    props;
  const classes = cn(
    "press group relative inline-flex items-center justify-center rounded-xl font-bold transition outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        target={props.target}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
