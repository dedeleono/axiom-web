"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="relative max-h-screen h-screen w-full overflow-hidden bg-black">
      

      <motion.div
        className="absolute inset-0 top-20 md:top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.1 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Image
            src="/portfolio/santa-clara-adu.jpg"
            alt="Santa Clara ADU project - contact Axiom Renovation for Bay Area home remodeling"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col md:flex-row justify-center md:justify-between items-stretch md:items-center gap-10 lg:gap-16 px-5 sm:px-8 md:px-16 py-10 md:py-12 mt-16 md:mt-0">
          <motion.div
            className="text-white w-full md:w-[42%] lg:w-1/2 max-w-xl shrink-0 font-geist-mono custom-range-style flex flex-col justify-center"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="text-[1.65rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.75rem] font-semibold uppercase leading-[1.12] tracking-tight">
              <span className="block ml-0.5">Crafting</span>
              <span className="block text-right mr-4 sm:mr-6">Tomorrow&apos;s</span>
              <span className="block ml-3 sm:ml-4 md:ml-0 lg:ml-3 text-nowrap">Spaces Together</span>
            </h1>
            <p className="mt-7 md:mt-10 max-w-md text-white/75 text-sm sm:text-[15px] md:text-base font-light leading-[1.65] font-geist">
              Request a consultation or send a general message—one form, and our team will get back to you shortly.
            </p>
          </motion.div>

          <motion.div
            className="w-full md:flex-1 md:max-w-xl lg:max-w-md min-h-0 flex flex-col"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="
                rounded-none border border-white/9
                bg-black/45 backdrop-blur-2xl
                shadow-[0_32px_90px_-28px_rgba(0,0,0,0.75)]
                ring-1 ring-inset ring-white/4
                p-6 sm:p-8 md:p-10
                max-h-[min(78vh,720px)] overflow-y-auto overflow-x-hidden
                [scrollbar-width:thin]
                [scrollbar-color:rgba(255,255,255,0.18)_transparent]
              "
            >
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
