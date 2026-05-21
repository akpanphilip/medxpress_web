"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * An <img> that gracefully degrades to a branded gradient placeholder if the
 * remote image fails to load, so the layout never breaks.
 */
export default function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  icon: Icon = ImageIcon,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  icon?: LucideIcon;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-gradient-to-br from-sky/25 via-sky/10 to-violet/20",
          className,
        )}
      >
        <Icon className="text-sky/60" size={40} />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
