"use client";

import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

import PhoneDialog, { PhoneDialogHandle } from "./phone-dialog";

export default function FooterClientActions() {
  const dialogRef = useRef<PhoneDialogHandle>(null);

  return (
    <>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between border-t border-brand-light-gray px-8 pt-8 text-xs text-brand-dark-gray md:flex-row">
        <p>650-405-3956 All rights reserved @axiom renovation</p>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-brand-light-gray text-brand-black transition-colors hover:bg-brand-black hover:text-white"
            onClick={() => dialogRef.current?.open()}
          >
            Contact Us
          </Button>
          <Link
            href="https://api.whatsapp.com/send/?phone=14087022022"
            target="_blank"
            className="font-bold text-green-600 hover:underline"
          >
            Whatsapp
          </Link>
        </div>
      </div>
      <PhoneDialog ref={dialogRef} />
    </>
  );
}
