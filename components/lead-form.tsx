"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { captureAttribution } from "@/lib/attribution";
import { trackLeadSubmit } from "@/lib/analytics";
import { redirectToThankYouPage } from "@/lib/thank-you";
import {
  quickLeadSchema,
  SERVICE_OPTIONS,
  type QuickLeadValues,
} from "@/lib/validations/lead";

const fieldClass =
  "h-11 rounded-none border-x-0 border-t-0 border-b border-brand-light-gray bg-transparent px-0 text-brand-black shadow-none focus-visible:border-brand-orange focus-visible:ring-0 placeholder:text-brand-dark-gray/50";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-brand-dark-gray";

export interface LeadFormProps {
  className?: string;
  /** Identifies the page / placement in the lead email + analytics. */
  source?: string;
  submitLabel?: string;
}

export default function LeadForm({
  className,
  source = "site",
  submitLabel = "Get my free estimate",
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuickLeadValues>({
    resolver: zodResolver(quickLeadSchema),
    defaultValues: { name: "", phone: "", service: "", page: source },
  });

  async function onSubmit(data: QuickLeadValues) {
    try {
      setIsSubmitting(true);
      const attribution = captureAttribution();

      const response = await fetch("/api/sendLeadEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: source, attribution }),
      });
      if (!response.ok) throw new Error("Failed to send lead");

      trackLeadSubmit({
        formId: "quick_lead",
        phone: data.phone,
        service: data.service,
        context: attribution as Record<string, string | undefined>,
      });
      redirectToThankYouPage();
    } catch (error) {
      toast.error("Something went wrong. Please call 408-702-2022.");
      console.error("Lead submit error:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className} noValidate>
        <div className="space-y-6">
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
                <FormMessage className="text-xs text-red-600" />
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
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    {...field}
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className={labelClass}>Project type</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    disabled={isSubmitting}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a service…
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-none bg-brand-orange text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-black"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </span>
            ) : (
              submitLabel
            )}
          </Button>
          <p className="text-center text-[11px] font-light text-brand-dark-gray">
            No obligation. We reply within one business day.
          </p>
        </div>
      </form>
    </Form>
  );
}
