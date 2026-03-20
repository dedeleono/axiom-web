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

        <div className="absolute inset-0 flex flex-col md:flex-row justify-center md:justify-between items-center px-4 md:px-16 py-8 md:py-0 mt-20 md:m-0">
          <motion.div
            className="text-white w-full md:w-1/2 max-w-none md:mt-0 font-geist-mono custom-range-style"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <h1 className="text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-semibold uppercase">
              <span className="block ml-1">Crafting</span>
              <span className="block text-right mr-5">Tomorrow&apos;s</span>
              <span className="block ml-4 md:ml-0 lg:ml-4 text-nowrap">Spaces Together</span>
            </h1>
          </motion.div>

          <motion.div
            className="w-[300px] md:w-1/2 bg-black backdrop-blur-md p-4 md:p-8 mt-8 md:mt-0 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
