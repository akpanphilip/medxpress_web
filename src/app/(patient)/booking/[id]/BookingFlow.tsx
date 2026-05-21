"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Video,
  MessageSquare,
  Check,
  CreditCard,
  Lock,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import type { Doctor } from "@/lib/types";
import { formatMoney } from "@/lib/utils";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";

const SERVICE_FEE = 500;
const STEPS = ["Schedule", "Payment", "Confirmed"];

export default function BookingFlow({ doctor }: { doctor: Doctor }) {
  return (
    <Suspense fallback={<div className="skeleton h-64 rounded-2xl" />}>
      <BookingInner doctor={doctor} />
    </Suspense>
  );
}

function BookingInner({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [type, setType] = useState<"video" | "chat">("video");
  const [reason, setReason] = useState("");
  const [gateway, setGateway] = useState<"paystack" | "stripe">("paystack");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [cardTouched, setCardTouched] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const d = params.get("day");
    const s = params.get("slot");
    if (d !== null && !Number.isNaN(Number(d)))
      setDayIndex(
        Math.min(Math.max(Number(d), 0), doctor.availability.length - 1),
      );
    if (s) setSlot(s);
  }, [params, doctor.availability.length]);

  const day = doctor.availability[dayIndex];
  const total = doctor.fee + SERVICE_FEE;

  const cardErrors = {
    number:
      card.number.replace(/\s/g, "").length < 15
        ? "Enter a valid card number"
        : "",
    expiry: !/^\d{2}\/\d{2}$/.test(card.expiry) ? "Use MM/YY format" : "",
    cvv: card.cvv.length < 3 ? "3-digit code" : "",
  };
  const cardValid = !Object.values(cardErrors).some(Boolean);

  const pay = () => {
    setCardTouched(true);
    if (!cardValid) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {step < 2 && (
        <button
          onClick={() => (step === 0 ? router.back() : setStep(step - 1))}
          className="press flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-sky"
        >
          <ArrowLeft size={18} /> Back
        </button>
      )}

      {/* Stepper */}
      <div className="flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold transition ${
                  i < step
                    ? "bg-online text-white"
                    : i === step
                      ? "bg-gradient-to-r from-sky to-sky-600 text-white"
                      : "bg-surface-2 text-muted"
                }`}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span
                className={`hidden text-sm font-bold sm:block ${
                  i <= step ? "text-foreground" : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 rounded-full ${
                  i < step ? "bg-online" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 2 ? (
        <ConfirmedView
          doctor={doctor}
          day={`${day.day} ${day.date}`}
          slot={slot}
          type={type}
          total={total}
          gateway={gateway}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Step content */}
          <div className="space-y-5">
            {step === 0 && (
              <div className="space-y-5 fade-up">
                <Card className="space-y-4 p-5">
                  <h2 className="flex items-center gap-2 font-display text-lg font-extrabold">
                    <CalendarDays size={18} className="text-sky" /> Pick a date
                  </h2>
                  <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                    {doctor.availability.map((d, i) => (
                      <button
                        key={d.date}
                        onClick={() => {
                          setDayIndex(i);
                          setSlot(null);
                        }}
                        className={`flex shrink-0 flex-col items-center rounded-xl border-2 px-4 py-2.5 transition ${
                          dayIndex === i
                            ? "border-sky bg-sky/10"
                            : "border-border hover:border-sky/40"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold ${
                            dayIndex === i ? "text-sky" : "text-muted"
                          }`}
                        >
                          {d.day}
                        </span>
                        <span className="text-sm font-extrabold">
                          {d.date.split(" ")[1]}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-bold">Available slots</p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {day.slots.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`rounded-lg border py-2 text-sm font-bold transition ${
                            slot === s
                              ? "border-sky bg-sky text-white"
                              : "border-border hover:border-sky"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="space-y-4 p-5">
                  <h2 className="font-display text-lg font-extrabold">
                    Consultation type
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { id: "video", label: "Video call", icon: Video },
                        { id: "chat", label: "Chat", icon: MessageSquare },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={`press flex flex-col items-center gap-1.5 rounded-xl border-2 py-4 text-sm font-bold transition ${
                          type === t.id
                            ? "border-sky bg-sky/10 text-sky"
                            : "border-border text-muted hover:border-sky/40"
                        }`}
                      >
                        <t.icon size={22} />
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <TextArea
                    id="reason"
                    label="Reason for visit (optional)"
                    rows={3}
                    placeholder="Briefly describe your symptoms or concern"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </Card>

                <Button
                  fullWidth
                  size="lg"
                  onClick={() => slot && setStep(1)}
                  disabled={!slot}
                >
                  {slot ? "Continue to payment" : "Select a time slot"}
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5 fade-up">
                <Card className="space-y-4 p-5">
                  <h2 className="font-display text-lg font-extrabold">
                    Payment method
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {(
                      [
                        { id: "paystack", label: "Paystack" },
                        { id: "stripe", label: "Stripe" },
                      ] as const
                    ).map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGateway(g.id)}
                        className={`press rounded-xl border-2 py-3.5 text-sm font-bold transition ${
                          gateway === g.id
                            ? "border-sky bg-sky/10 text-sky"
                            : "border-border text-muted hover:border-sky/40"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                  <Input
                    id="card-number"
                    label="Card number"
                    inputMode="numeric"
                    placeholder="4084 0000 0000 0000"
                    icon={<CreditCard size={18} />}
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                    error={cardTouched ? cardErrors.number : ""}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      id="card-expiry"
                      label="Expiry date"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) =>
                        setCard({ ...card, expiry: e.target.value })
                      }
                      error={cardTouched ? cardErrors.expiry : ""}
                    />
                    <Input
                      id="card-cvv"
                      label="CVV"
                      inputMode="numeric"
                      placeholder="123"
                      value={card.cvv}
                      onChange={(e) =>
                        setCard({ ...card, cvv: e.target.value })
                      }
                      error={cardTouched ? cardErrors.cvv : ""}
                    />
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Lock size={13} className="text-online" /> Payments are
                    encrypted and processed securely.
                  </p>
                </Card>
                <Button fullWidth size="lg" onClick={pay} disabled={processing}>
                  {processing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Processing payment...
                    </>
                  ) : (
                    <>
                      <Lock size={17} /> Pay {formatMoney(total)}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="space-y-4 p-5">
              <h3 className="font-display text-lg font-extrabold">
                Booking summary
              </h3>
              <div className="flex items-center gap-3 rounded-2xl bg-surface-2/60 p-3">
                <Avatar
                  src={doctor.avatar}
                  name={doctor.name}
                  size={48}
                  className="rounded-xl"
                />
                <div>
                  <p className="text-sm font-bold">{doctor.name}</p>
                  <p className="text-xs text-sky">{doctor.specialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Row
                  label="Date & time"
                  value={
                    slot ? `${day.day} ${day.date}, ${slot}` : "Not selected"
                  }
                />
                <Row
                  label="Type"
                  value={type === "video" ? "Video call" : "Chat"}
                />
              </div>
              <div className="space-y-2 border-t border-border pt-3">
                <Row
                  label="Consultation fee"
                  value={formatMoney(doctor.fee)}
                />
                <Row label="Service fee" value={formatMoney(SERVICE_FEE)} />
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-bold">Total</span>
                <span className="font-display text-xl font-extrabold text-sky">
                  {formatMoney(total)}
                </span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmedView({
  doctor,
  day,
  slot,
  type,
  total,
  gateway,
}: {
  doctor: Doctor;
  day: string;
  slot: string | null;
  type: "video" | "chat";
  total: number;
  gateway: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-lg space-y-6 py-4 text-center"
    >
      <div className="relative mx-auto grid h-28 w-28 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-red/20" />
        <div className="check-pop relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-red to-red-600 text-white shadow-2xl shadow-red/40">
          <Check size={54} strokeWidth={3} />
        </div>
      </div>
      <div>
        <h2 className="font-display text-3xl font-extrabold">
          Booking confirmed!
        </h2>
        <p className="mt-1 text-sm text-muted">
          Your consultation with {doctor.name} is scheduled. A reminder has
          been sent to your email.
        </p>
      </div>
      <Card className="space-y-3 p-5 text-left">
        <Row label="Doctor" value={doctor.name} />
        <Row label="Date & time" value={`${day}, ${slot}`} />
        <Row label="Type" value={type === "video" ? "Video call" : "Chat"} />
        <Row label="Amount paid" value={formatMoney(total)} />
        <Row
          label="Paid via"
          value={gateway === "paystack" ? "Paystack" : "Stripe"}
        />
        <div className="flex items-center gap-1.5 rounded-lg bg-online/10 px-3 py-2 text-xs font-bold text-online">
          <ShieldCheck size={14} /> Payment successful
        </div>
      </Card>
      <div className="space-y-2">
        <Button
          href={`/consultation/${doctor.id}?type=${type}`}
          fullWidth
          size="lg"
        >
          <Video size={18} /> Join consultation room
        </Button>
        <Button href="/appointments" variant="outline" fullWidth>
          View my appointments
        </Button>
      </div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-bold text-foreground">{value}</span>
    </div>
  );
}
