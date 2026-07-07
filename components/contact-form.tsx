"use client";

import {
  generalInquirySchema,
  type GeneralInquiryValues,
} from "@/lib/validations/contact";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ConsultationStepper from "@/components/consultation-stepper";
import { trackLeadSubmit } from "@/lib/analytics";
import { redirectToThankYouPage } from "@/lib/thank-you";

const fieldClass =
  "border-t-0 border-x-0 rounded-none bg-transparent border-b border-white/20 px-0 focus:border-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/30 transition-[border-color] duration-300 disabled:opacity-50";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-white/45";

export type ContactFormFlow = "consultation" | "general";

export interface ContactFormProps {
  flow: ContactFormFlow;
  onBack: () => void;
}

export default function ContactForm({ flow, onBack }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<GeneralInquiryValues>({
    resolver: zodResolver(generalInquirySchema),
    defaultValues: {
      intent: "general",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: GeneralInquiryValues) {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/sendContactEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setIsSent(true);
      // Fire-and-forget GTM lead event; must never delay or block the
      // conversion redirect below.
      trackLeadSubmit({
        formId: "contact_form",
        email: data.email,
        phone: data.phone,
      });
      redirectToThankYouPage();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const shellEyebrow = (
    <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 md:mb-8">
      Get in touch
    </p>
  );

  if (flow === "consultation") {
    return (
      <div className="w-full">
        {shellEyebrow}
        <ConsultationStepper onBackToIntent={onBack} />
      </div>
    );
  }

  return (
    <div className="w-full">
      {shellEyebrow}

      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            key="general-sent"
            className="space-y-7 py-4 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-auto h-px w-10 bg-brand-orange" aria-hidden />
            <h2 className="text-xl font-light tracking-tight text-white sm:text-2xl">
              Message sent
            </h2>
            <p className="mx-auto max-w-sm text-sm font-light leading-relaxed text-white/55">
              Thanks for reaching out. We&apos;ve received your message and
              will get back to you within one business day.
            </p>
            <Button
              type="button"
              onClick={() => setIsSent(false)}
              className="mt-2 h-11 rounded-none border border-white/15 bg-transparent px-10 text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:bg-white/6"
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="general-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onBack}
              className="mb-8 text-left text-[11px] font-medium uppercase tracking-[0.18em] text-white/38 transition-colors hover:text-white/70"
            >
              ← Back
            </button>
            <p className="text-white text-lg font-light tracking-tight mb-8">
              Leave your information
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className={labelClass}>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane Doe"
                          autoComplete="name"
                          disabled={isSubmitting}
                          {...field}
                          className={fieldClass}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300/90 text-xs" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClass}>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="jane@example.com"
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            disabled={isSubmitting}
                            {...field}
                            className={fieldClass}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300/90 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className={labelClass}>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(408) 555-0123"
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            disabled={isSubmitting}
                            {...field}
                            className={fieldClass}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300/90 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className={labelClass}>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a bit about your project…"
                          disabled={isSubmitting}
                          {...field}
                          className={`${fieldClass} min-h-27 resize-y`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-300/90 text-xs" />
                    </FormItem>
                  )}
                />
                <div className="space-y-3 pt-1">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-11 w-full rounded-none bg-white text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-white/90"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                  <p className="text-center text-[11px] font-light text-white/35">
                    We typically respond within one business day.
                  </p>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
