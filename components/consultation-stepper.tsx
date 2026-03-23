"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ConsultationRequestValues } from "@/lib/validations/contact";
import { consultationRequestSchema } from "@/lib/validations/contact";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CONSULTATION_PROJECT_OPTIONS } from "@/lib/consultation-project-options";

const TIMELINE_OPTIONS: {
  value: ConsultationRequestValues["startTimeline"];
  label: string;
}[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "within_year", label: "Within the next year" },
  { value: "over_year", label: "Over a year from now" },
  { value: "undecided", label: "I need help deciding" },
];

const inputClass =
  "border-t-0 border-x-0 rounded-none bg-transparent border-b border-white/35 focus:border-white/90 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/45 transition-[border-color] duration-300";

const choiceClass = (active: boolean) =>
  cn(
    "text-left text-[13px] sm:text-sm leading-snug px-4 py-3.5 sm:py-4 rounded-xl border transition-all duration-300 ease-out",
    "hover:border-white/35 hover:bg-white/[0.06]",
    active
      ? "border-white/50 bg-white/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      : "border-white/[0.14] bg-white/[0.04] text-white/90"
  );

const STEP_COUNT = 4;

type StepData = {
  projectTypes: string[];
  hasArchitecturalPlans: "yes" | "no" | null;
  startTimeline: ConsultationRequestValues["startTimeline"] | null;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialStepData: StepData = {
  projectTypes: [],
  hasArchitecturalPlans: null,
  startTimeline: null,
  name: "",
  email: "",
  phone: "",
  message: "",
};

type ConsultationStepperProps = {
  onBackToIntent?: () => void;
};

export default function ConsultationStepper({
  onBackToIntent,
}: ConsultationStepperProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>(initialStepData);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(
    () => ((step + 1) / STEP_COUNT) * 100,
    [step]
  );

  const validateStep = useCallback((): boolean => {
    setFieldErrors({});
    if (step === 0) {
      if (data.projectTypes.length === 0) {
        setFieldErrors({ projectTypes: "Choose at least one option" });
        return false;
      }
      return true;
    }
    if (step === 1) {
      if (data.hasArchitecturalPlans === null) {
        setFieldErrors({ plans: "Please select Yes or No" });
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (data.startTimeline === null) {
        setFieldErrors({ timeline: "Please select an option" });
        return false;
      }
      return true;
    }
    return true;
  }, [step, data]);

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  };

  const goBack = () => {
    setFieldErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    setFieldErrors({});
    const payload: ConsultationRequestValues = {
      intent: "consultation",
      projectTypes: data.projectTypes,
      hasArchitecturalPlans: data.hasArchitecturalPlans!,
      startTimeline: data.startTimeline!,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      message: data.message.trim(),
    };

    const parsed = consultationRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      if (flat.name?.[0]) next.name = flat.name[0];
      if (flat.email?.[0]) next.email = flat.email[0];
      if (flat.phone?.[0]) next.phone = flat.phone[0];
      if (flat.message?.[0]) next.message = flat.message[0];
      setFieldErrors(next);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/sendContactEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Failed");
      setSubmitted(true);
      toast.success("Request sent");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProject = (id: string) => {
    setData((d) => ({
      ...d,
      projectTypes: d.projectTypes.includes(id)
        ? d.projectTypes.filter((x) => x !== id)
        : [...d.projectTypes, id],
    }));
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-4 space-y-7"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-white text-[1.35rem] font-light tracking-tight">
          Thank you
        </h2>
        <p className="text-white/65 text-sm leading-relaxed max-w-xs mx-auto">
          You&apos;ll receive a confirmation email shortly. Our team will follow
          up to schedule your consultation.
        </p>
        <Button
          asChild
          className="rounded-full bg-brand-orange hover:bg-brand-orange/92 text-white px-10 h-11 text-xs font-semibold uppercase tracking-[0.16em]"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {onBackToIntent && (
        <button
          type="button"
          onClick={onBackToIntent}
          className="text-white/45 hover:text-white/85 text-[10px] uppercase tracking-[0.22em] mb-7 transition-colors"
        >
          ← Change option
        </button>
      )}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/40">
          Step {step + 1} of {STEP_COUNT}
        </span>
        <span className="text-[10px] tabular-nums text-white/35">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1 w-full bg-white/[0.08] rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-orange to-orange-400/90"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <p className="text-white text-[1.05rem] sm:text-lg font-light leading-snug tracking-tight">
                  What projects are you considering?{" "}
                  <span className="text-brand-orange">*</span>
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2">
                  Choose as many as you like
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CONSULTATION_PROJECT_OPTIONS.map((opt) => {
                  const sel = data.projectTypes.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleProject(opt.id)}
                      className={choiceClass(sel)}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.projectTypes && (
                <p className="text-red-300/90 text-xs">{fieldErrors.projectTypes}</p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <p className="text-white text-[1.05rem] sm:text-lg font-light leading-snug tracking-tight">
                Do you already have architectural plans or drawings?{" "}
                <span className="text-brand-orange">*</span>
              </p>
              <div className="flex flex-col gap-2.5">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setData((d) => ({ ...d, hasArchitecturalPlans: v }))
                    }
                    className={choiceClass(data.hasArchitecturalPlans === v)}
                  >
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
              {fieldErrors.plans && (
                <p className="text-red-300/90 text-xs">{fieldErrors.plans}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-white text-[1.05rem] sm:text-lg font-light leading-snug tracking-tight">
                When do you hope to start renovating?{" "}
                <span className="text-brand-orange">*</span>
              </p>
              <div className="flex flex-col gap-2.5">
                {TIMELINE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setData((d) => ({ ...d, startTimeline: opt.value }))
                    }
                    className={choiceClass(data.startTimeline === opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {fieldErrors.timeline && (
                <p className="text-red-300/90 text-xs">{fieldErrors.timeline}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <p className="text-white text-[1.05rem] sm:text-lg font-light leading-snug tracking-tight mb-1">
                How can we reach you? <span className="text-brand-orange">*</span>
              </p>
              <div>
                <Input
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) =>
                    setData((d) => ({ ...d, name: e.target.value }))
                  }
                  className={inputClass}
                />
                {fieldErrors.name && (
                  <p className="text-red-300/90 text-xs mt-1.5">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={data.email}
                  onChange={(e) =>
                    setData((d) => ({ ...d, email: e.target.value }))
                  }
                  className={inputClass}
                />
                {fieldErrors.email && (
                  <p className="text-red-300/90 text-xs mt-1.5">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Phone"
                  value={data.phone}
                  onChange={(e) =>
                    setData((d) => ({ ...d, phone: e.target.value }))
                  }
                  className={inputClass}
                />
                {fieldErrors.phone && (
                  <p className="text-red-300/90 text-xs mt-1.5">{fieldErrors.phone}</p>
                )}
              </div>
              <div>
                <Textarea
                  placeholder="Tell us anything else we should know"
                  value={data.message}
                  onChange={(e) =>
                    setData((d) => ({ ...d, message: e.target.value }))
                  }
                  className={cn(inputClass, "min-h-[104px] resize-y")}
                />
                {fieldErrors.message && (
                  <p className="text-red-300/90 text-xs mt-1.5">{fieldErrors.message}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 mt-10 pt-2 border-t border-white/[0.06]">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 0 || isSubmitting}
          className="text-white/55 hover:text-white hover:bg-white/[0.07] px-3 h-10 -ml-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5 opacity-80" />
          <span className="text-xs uppercase tracking-[0.14em]">Back</span>
        </Button>
        {step < STEP_COUNT - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            className="rounded-full bg-brand-orange hover:bg-brand-orange/92 text-white px-8 h-10 text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_8px_24px_-8px_rgba(242,86,35,0.55)]"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1 opacity-90" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="rounded-full bg-brand-orange hover:bg-brand-orange/92 text-white px-8 h-10 text-xs font-semibold uppercase tracking-[0.14em] shadow-[0_8px_24px_-8px_rgba(242,86,35,0.55)]"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
