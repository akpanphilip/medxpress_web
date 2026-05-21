import Link from "next/link";
import { MapPin, BadgeCheck, ArrowRight } from "lucide-react";
import type { Doctor } from "@/lib/types";
import { formatMoney, personAvatar } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import SmartImage from "@/components/ui/SmartImage";

const statusBadge = {
  online: { tone: "online" as const, label: "Available" },
  busy: { tone: "red" as const, label: "Busy" },
  offline: { tone: "neutral" as const, label: "Offline" },
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const status = statusBadge[doctor.status];

  return (
    <Card interactive className="group overflow-hidden">
      <Link href={`/doctors/${doctor.id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <SmartImage
            src={personAvatar(doctor.name)}
            alt={doctor.name}
            className="h-full w-full"
            imgClassName="transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
          <div className="absolute left-3 top-3">
            <Badge tone={status.tone} dot pulse={doctor.status === "online"}>
              {status.label}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="flex items-center gap-1 font-display text-lg font-extrabold text-white">
                {doctor.name}
                {doctor.verified && (
                  <BadgeCheck size={16} className="text-sky-400" />
                )}
              </p>
              <p className="text-sm font-semibold text-sky-400">
                {doctor.specialty}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 p-4">
          <div className="flex items-center justify-between">
            <Rating value={doctor.rating} count={doctor.reviewCount} size={14} />
            <span className="text-xs font-semibold text-muted">
              {doctor.experience} yrs exp
            </span>
          </div>
          <p className="flex items-center gap-1 truncate text-xs text-muted">
            <MapPin size={12} className="shrink-0" />
            {doctor.hospital}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-border bg-surface-2/40 px-4 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            From
          </p>
          <p className="font-display text-lg font-extrabold">
            {formatMoney(doctor.fee)}
          </p>
        </div>
        <Link
          href={`/booking/${doctor.id}`}
          className="press flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky to-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky/30"
        >
          Book <ArrowRight size={15} />
        </Link>
      </div>
    </Card>
  );
}
