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
import type { ContactIntent } from "@/lib/validations/contact";
import { ChevronDown } from "lucide-react";

const fieldClass =
  "border-t-0 border-x-0 rounded-none bg-transparent border-b border-white/35 focus:border-white/90 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/45 transition-[border-color] duration-300";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intent, setIntent] = useState<ContactIntent | "">("");

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

  const intentSelectClass =
    "w-full bg-transparent border-0 rounded-none text-white py-2.5 pr-10 pl-0 text-[15px] outline-none cursor-pointer appearance-none";

  if (intent === "consultation") {
    return (
      <div className="w-full">
        <p className="text-white/55 text-[10px] font-semibold uppercase tracking-[0.28em] mb-6">
          Consultations &amp; inquiries
        </p>
        <ConsultationStepper onBackToIntent={() => setIntent("")} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="text-white/55 text-[10px] font-semibold uppercase tracking-[0.28em] mb-6">
        Consultations &amp; inquiries
      </p>
      <div className="space-y-7">
        <div>
          <label className="text-[10px] uppercase tracking-[0.22em] text-white/45 block mb-3">
            How can we help?
          </label>
          <div className="relative group">
            <select
              value={intent}
              onChange={(e) => {
                const v = e.target.value as ContactIntent | "";
                setIntent(v);
              }}
              className={intentSelectClass}
            >
              <option value="" className="bg-neutral-950 text-white/50">
                Select an option
              </option>
              <option value="consultation" className="bg-neutral-950">
                Request a consultation
              </option>
              <option value="general" className="bg-neutral-950">
                General inquiry
              </option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35 group-hover:text-white/55 transition-colors"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-8 h-px bg-gradient-to-r from-white/50 via-white/25 to-transparent" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {intent === "general" && (
            <motion.div
              key="general-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
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
                    className="h-12 w-full rounded-none bg-white text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950 transition-colors hover:bg-white/92"
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
