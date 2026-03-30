"use client";

import { useCallback, useState } from "react";
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
import type { PlanAttachmentRef } from "@/lib/consultation-upload-config";
import { ConsultationPlanDropzone } from "@/components/consultation-plan-dropzone";

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
  "border-t-0 border-x-0 rounded-none bg-transparent border-b border-white/20 focus:border-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/40 transition-[border-color] duration-300";

const choiceClass = (active: boolean) =>
  cn(
    "text-left text-sm leading-snug px-4 py-3.5 sm:py-3.5 rounded-none border transition-[color,border-color,background-color] duration-300 ease-out font-light",
    "hover:border-white/25 hover:bg-white/[0.03]",
    active
      ? "border-white/35 bg-white/[0.06] text-white"
      : "border-white/[0.10] bg-transparent text-white/80"
  );

const STEP_COUNT = 4;

const STEP_LABELS = ["Project", "Plans", "Timeline", "Details"] as const;

type StepData = {
  projectTypes: string[];
  hasArchitecturalPlans: "yes" | "no" | null;
  planAttachments: PlanAttachmentRef[];
  startTimeline: ConsultationRequestValues["startTimeline"] | null;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialStepData: StepData = {
  projectTypes: [],
  hasArchitecturalPlans: null,
  planAttachments: [],
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
      planAttachments:
        data.hasArchitecturalPlans === "yes" ? data.planAttachments : [],
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
        <h2 className="text-white text-xl sm:text-2xl font-light tracking-tight">
          Thank you
        </h2>
        <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto font-light">
          You&apos;ll receive a confirmation email shortly. Our team will follow
          up to schedule your consultation.
        </p>
        <Button
          asChild
          className="mt-2 h-11 rounded-none border border-white/15 bg-transparent px-10 text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/6"
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
          className="mb-8 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-white/38 transition-colors hover:text-white/70"
        >
          ← Back
        </button>
      )}
      <div
        className="mb-10"
        role="group"
        aria-label={`Consultation, step ${step + 1} of ${STEP_COUNT}: ${STEP_LABELS[step]}`}
      >
        <div className="flex gap-2" aria-hidden>
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-0.5 flex-1 transition-[background-color] duration-500 ease-out",
                i < step && "bg-white/28",
                i === step && "bg-brand-orange",
                i > step && "bg-white/8"
              )}
            />
          ))}
        </div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/38">
          {STEP_LABELS[step]}
          <span className="text-white/25 font-normal normal-case tracking-normal">
            {" "}
            · {step + 1}/{STEP_COUNT}
          </span>
        </p>
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
                <p className="text-white text-lg sm:text-xl font-light leading-snug tracking-tight text-pretty">
                  What projects are you considering?
                  <span className="text-white/35 text-base font-normal"> *</span>
                </p>
                <p className="text-white/38 text-[11px] font-medium uppercase tracking-[0.18em] mt-3">
                  Choose as many as you like
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <p className="text-white text-lg sm:text-xl font-light leading-snug tracking-tight text-pretty">
                Do you already have architectural plans or drawings?
                <span className="text-white/35 text-base font-normal"> *</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        hasArchitecturalPlans: v,
                        planAttachments: v === "no" ? [] : d.planAttachments,
                      }))
                    }
                    className={cn(
                      choiceClass(data.hasArchitecturalPlans === v),
                      "flex w-full items-center justify-center sm:flex-1"
                    )}
                  >
                    {v === "yes" ? "Yes" : "No"}
                  </button>
                ))}
              </div>
              {data.hasArchitecturalPlans === "yes" && (
                <div className="pt-2 space-y-3">
                  <p className="text-white/38 text-[11px] font-medium uppercase tracking-[0.18em]">
                    Upload plans (optional)
                  </p>
                  <ConsultationPlanDropzone
                    files={data.planAttachments}
                    onFilesChange={(planAttachments) =>
                      setData((d) => ({ ...d, planAttachments }))
                    }
                    disabled={isSubmitting}
                  />
                </div>
              )}
              {fieldErrors.plans && (
                <p className="text-red-300/90 text-xs">{fieldErrors.plans}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-white text-lg sm:text-xl font-light leading-snug tracking-tight text-pretty">
                When do you hope to start renovating?
                <span className="text-white/35 text-base font-normal"> *</span>
              </p>
              <div className="flex flex-col gap-2">
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
              <p className="text-white text-lg sm:text-xl font-light leading-snug tracking-tight text-pretty mb-2">
                How can we reach you?
                <span className="text-white/35 text-base font-normal"> *</span>
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

      <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-white/8">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 0 || isSubmitting}
          className="h-10 px-2 text-white/45 transition-colors hover:bg-transparent hover:text-white/85 rounded-none"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5 opacity-70" strokeWidth={1.25} />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
            Back
          </span>
        </Button>
        {step < STEP_COUNT - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            className="h-10 rounded-none bg-brand-orange px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-none hover:bg-brand-orange/88"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-0.5 opacity-90" strokeWidth={1.25} />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="h-10 rounded-none bg-brand-orange px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-none hover:bg-brand-orange/88 disabled:opacity-50"
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
