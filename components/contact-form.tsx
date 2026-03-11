"use client";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
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

  return (
    <div className="w-full max-w-md mx-auto">
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
                    className="border-t-0 border-x-0 rounded-none bg-transparent border-b-2 border-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
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
                    className="border-t-0 border-x-0 rounded-none bg-transparent border-b-2 border-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
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
                    className="border-t-0 border-x-0 rounded-none bg-transparent border-b-2 border-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
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
                    className="border-t-0 border-x-0 rounded-none bg-transparent border-b-2 border-white/50 focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/50 min-h-[100px]"
                  />
                </FormControl>
                <FormMessage className="text-red-200" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-white text-black hover:bg-gray-200"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
