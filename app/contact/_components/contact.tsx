"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="relative max-h-screen h-screen w-full overflow-hidden bg-black">
      <div className="absolute top-28 left-8 z-10 flex flex-row items-center space-x-3 text-white">
        <span className="text-sm font-semibold">Contact</span>
        <div className="w-2 h-2">
          <svg
            width="24"
            height="15"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scale-50 transform-gpu"
          >
            <path
              d="M6.26784 1.54193L6.22778 1.50188C6.22778 1.50188 6.25782 2.65332 5.01627 4.13517L0.871089 0L0 0.871089L4.14518 5.01627C2.66333 6.25782 1.5219 6.19775 1.51189 6.22778L1.55194 6.26784C6.38798 6.84856 8 8 8 8C8 8 6.84856 6.37797 6.26784 1.55194V1.54193Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

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
            src="/contact.png"
            alt="contact"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black md:bg-opacity-30 bg-opacity-60" />

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
            <h1 className="text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-semibold uppercase ml-1">
              Crafting
            </h1>
            <h1 className="text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-semibold text-right uppercase mr-5">
              Tomorrow&apos;s
            </h1>
            <h1 className="text-[1.6rem] md:text-[2.2rem] lg:text-[2.8rem] font-semibold ml-4 md:ml-0 lg:ml-4 uppercase text-nowrap">
              Spaces Together
            </h1>
          </motion.div>

          <motion.div
            className="w-[300px] md:w-1/2 bg-black backdrop-blur-md p-4 md:p-8 mt-8 md:mt-0"
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
