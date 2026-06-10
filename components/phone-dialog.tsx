"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone } from "lucide-react";

export type PhoneDialogHandle = {
  open: () => void;
  close: () => void;
};

const PhoneDialog = forwardRef<PhoneDialogHandle>((_, ref) => {
  const [open, setOpen] = useState(false);
  const phoneNumber = "408-702-2022";
  const phoneHref = "tel:+14087022022";

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-geist-mono">Call Us</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Phone className="h-12 w-12 text-gray-400" />
          <p className="text-xl font-semibold font-geist">
            TEL:{" "}
            <a
              href={phoneHref}
              className="font-geist-mono text-sky-600 hover:underline cursor-pointer"
            >
              {phoneNumber}
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
});

PhoneDialog.displayName = "PhoneDialog";

export default PhoneDialog;
