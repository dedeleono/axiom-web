"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  consultationRequestSchema,
  type ConsultationRequestValues,
} from "@/lib/validations/contact";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CONSULTATION_PROJECT_OPTIONS } from "@/lib/consultation-project-options";
import type { PlanAttachmentRef } from "@/lib/consultation-upload-config";
import { ConsultationPlanDropzone } from "@/components/consultation-plan-dropzone";
import { trackLeadSubmit } from "@/lib/analytics";
import { redirectToThankYouPage } from "@/lib/thank-you";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const TIMELINE_OPTIONS: {
  value: ConsultationRequestValues["startTimeline"];
  label: string;
}[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "within_year", label: "Within the next year" },
  { value: "over_year", label: "Over a year from now" },
  { value: "undecided", label: "I need help deciding" },
];

const choiceClass = (active: boolean) =>
  cn(
    "flex min-h-[48px] items-center text-left text-sm leading-snug rounded-none border px-4 py-3.5 transition-[color,border-color,background-color] duration-300 ease-out font-light max-md:py-4",
    "hover:border-white/25 hover:bg-white/[0.03]",
    active
      ? "border-white/35 bg-white/[0.06] text-white"
      : "border-white/[0.10] bg-transparent text-white/80"
  );

const STEP_COUNT = 4;

const STEP_LABELS = ["Project", "Plans", "Timeline", "Schedule"] as const;

type StepData = {
  projectTypes: string[];
  hasArchitecturalPlans: "yes" | "no" | null;
  planAttachments: PlanAttachmentRef[];
  startTimeline: ConsultationRequestValues["startTimeline"] | null;
  scheduledEventUri: string | null;
  inviteeName: string;
  inviteeEmail: string;
};

const initialStepData: StepData = {
  projectTypes: [],
  hasArchitecturalPlans: null,
  planAttachments: [],
  startTimeline: null,
  scheduledEventUri: null,
  inviteeName: "",
  inviteeEmail: "",
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
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);
  const [calendlyLoading, setCalendlyLoading] = useState(false);

  useEffect(() => {
    if (step === 3 && !calendlyUrl) {
      setCalendlyLoading(true);
      fetch("/api/calendly")
        .then((res) => res.json())
        .then((json) => {
          if (json.schedulingUrl) {
            setCalendlyUrl(json.schedulingUrl);
          }
        })
        .catch(() => {
          toast.error("Failed to load scheduling widget");
        })
        .finally(() => setCalendlyLoading(false));
    }
  }, [step, calendlyUrl]);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      const payload = e.data.payload;
      const eventUri = payload.event.uri;
      const inviteeUri = payload.invitee.uri;

      try {
        const res = await fetch(
          `/api/calendly/invitee?uri=${encodeURIComponent(inviteeUri)}`
        );
        if (!res.ok) throw new Error("Failed to fetch invitee");
        const invitee = await res.json();

        setData((d) => ({
          ...d,
          scheduledEventUri: eventUri,
          inviteeName: invitee.name,
          inviteeEmail: invitee.email,
        }));
      } catch {
        toast.error("Failed to confirm scheduling. Please try again.");
      }
    },
  });

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

  const submit = useCallback(async () => {
    if (!data.scheduledEventUri || !data.inviteeName || !data.inviteeEmail) {
      return;
    }

    setFieldErrors({});
    const payload = {
      intent: "consultation" as const,
      projectTypes: data.projectTypes,
      hasArchitecturalPlans: data.hasArchitecturalPlans!,
      planAttachments:
        data.hasArchitecturalPlans === "yes" ? data.planAttachments : [],
      startTimeline: data.startTimeline!,
      name: data.inviteeName,
      email: data.inviteeEmail,
      phone: "",
      message: "",
      scheduledEventUri: data.scheduledEventUri,
    };

    const parsed = consultationRequestSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error("Invalid submission data");
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
      toast.success("Consultation scheduled");
      // Fire-and-forget GTM lead event; must never delay or block the
      // conversion redirect below. This flow collects no phone number (the
      // Calendly invitee provides name/email only).
      trackLeadSubmit({
        formId: "consultation_stepper",
        email: data.inviteeEmail,
      });
      redirectToThankYouPage();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  useEffect(() => {
    if (data.scheduledEventUri && data.inviteeName && data.inviteeEmail) {
      submit();
    }
  }, [data.scheduledEventUri, data.inviteeName, data.inviteeEmail, submit]);

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
          You&apos;re all set
        </h2>
        <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto font-light">
          Your consultation has been scheduled. You&apos;ll receive a
          confirmation email shortly with all the details.
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
      {onBackToIntent && step === 0 && (
        <button
          type="button"
          onClick={onBackToIntent}
          className="mb-5 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-white/38 transition-colors hover:text-white/70 md:mb-6"
        >
          ← Back
        </button>
      )}
      <div
        className="mb-6 md:mb-8"
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
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/38">
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
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-2">
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
            <div className="-mx-2 sm:-mx-1 md:mx-0">
              {calendlyLoading && (
                <div className="flex h-105 items-center justify-center md:h-[max(420px,calc(min(78vh,720px)-300px))]">
                  <Loader2 className="h-5 w-5 animate-spin text-white/50" />
                </div>
              )}
              {!calendlyLoading && calendlyUrl && (
                /* Sized so the whole step fits inside the contact card
                   (max-h min(78vh,720px)) without scrolling it; ~300px is
                   the surrounding chrome (eyebrow, progress, nav, padding). */
                <div className="h-150 overflow-hidden md:h-[max(420px,calc(min(78vh,720px)-300px))]">
                  <InlineWidget
                    url={calendlyUrl}
                    styles={{ height: "100%", width: "100%", minWidth: "280px" }}
                    pageSettings={{
                      backgroundColor: "18181b",
                      textColor: "fafafa",
                      primaryColor: "e07539",
                      hideEventTypeDetails: true,
                      hideLandingPageDetails: true,
                      hideGdprBanner: true,
                    }}
                  />
                </div>
              )}
              {!calendlyLoading && !calendlyUrl && (
                <p className="text-white/50 text-sm py-8 text-center">
                  Unable to load scheduling. Please try again later.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mt-8">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 0 || isSubmitting}
          className="h-11 min-h-[48px] w-full justify-center px-2 text-white/45 transition-colors hover:bg-transparent hover:text-white/85 rounded-none sm:h-10 sm:min-h-0 sm:w-auto sm:justify-start"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5 opacity-70" strokeWidth={1.25} />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
            Back
          </span>
        </Button>
        {step < STEP_COUNT - 1 && (
          <Button
            type="button"
            onClick={goNext}
            className="h-11 min-h-[48px] w-full rounded-none bg-brand-orange px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-none hover:bg-brand-orange/88 sm:h-10 sm:min-h-0 sm:w-auto"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-0.5 opacity-90" strokeWidth={1.25} />
          </Button>
        )}
        {step === STEP_COUNT - 1 && isSubmitting && (
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Confirming...</span>
          </div>
        )}
      </div>
    </div>
  );
}
