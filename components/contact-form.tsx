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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import ConsultationStepper from "@/components/consultation-stepper";

const fieldClass =
  "border-t-0 border-x-0 rounded-none bg-transparent border-b border-white/20 focus:border-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/40 transition-[border-color] duration-300";

export type ContactFormFlow = "consultation" | "general";

export interface ContactFormProps {
  flow: ContactFormFlow;
  onBack: () => void;
}

export default function ContactForm({ flow, onBack }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      toast.success("Message sent successfully!");
      form.reset();
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
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
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
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        {...field}
                        className={`${fieldClass} min-h-[108px] resize-y`}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300/90 text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-none bg-white text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:bg-white/90"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
