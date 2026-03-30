"use client";

import { useCallback, useId, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { PlanAttachmentRef } from "@/lib/consultation-upload-config";
import {
  CONSULTATION_PLAN_MAX_BYTES,
  CONSULTATION_PLAN_MAX_FILES,
  isAllowedPlanMimeType,
} from "@/lib/consultation-upload-config";

type ConsultationPlanDropzoneProps = {
  files: PlanAttachmentRef[];
  onFilesChange: (next: PlanAttachmentRef[]) => void;
  disabled?: boolean;
};

async function uploadOne(file: File): Promise<PlanAttachmentRef> {
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/uploadConsultationFile", {
    method: "POST",
    body,
  });
  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const msg =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : "Upload failed";
    throw new Error(msg);
  }
  if (
    !data ||
    typeof data !== "object" ||
    typeof (data as { url?: unknown }).url !== "string" ||
    typeof (data as { filename?: unknown }).filename !== "string" ||
    typeof (data as { assetId?: unknown }).assetId !== "string"
  ) {
    throw new Error("Invalid response from server");
  }
  return {
    url: (data as { url: string }).url,
    filename: (data as { filename: string }).filename,
    assetId: (data as { assetId: string }).assetId,
  };
}

export function ConsultationPlanDropzone({
  files,
  onFilesChange,
  disabled,
}: ConsultationPlanDropzoneProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFileList = useCallback(
    async (list: FileList | File[]) => {
      setError(null);
      const arr = Array.from(list);
      const remaining = CONSULTATION_PLAN_MAX_FILES - files.length;
      if (remaining <= 0) {
        setError(`You can upload up to ${CONSULTATION_PLAN_MAX_FILES} files.`);
        return;
      }

      const slice = arr.slice(0, remaining);
      const valid: File[] = [];
      for (const f of slice) {
        if (f.size > CONSULTATION_PLAN_MAX_BYTES) {
          setError(`"${f.name}" is over 20 MB.`);
          return;
        }
        if (!f.type || !isAllowedPlanMimeType(f.type)) {
          setError(
            `"${f.name}" is not a supported type. Use PDF, PNG, JPEG, or WebP.`
          );
          return;
        }
        valid.push(f);
      }

      if (valid.length === 0) return;

      setIsUploading(true);
      try {
        const uploaded: PlanAttachmentRef[] = [];
        for (const f of valid) {
          uploaded.push(await uploadOne(f));
        }
        onFilesChange([...files, ...uploaded]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [files, onFilesChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled || isUploading) return;
      const dt = e.dataTransfer.files;
      if (dt?.length) void processFileList(dt);
    },
    [disabled, isUploading, processFileList]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fl = e.target.files;
      if (fl?.length) void processFileList(fl);
      e.target.value = "";
    },
    [processFileList]
  );

  const removeAt = async (index: number) => {
    const ref = files[index];
    if (!ref) return;

    if (ref.assetId) {
      setRemovingIndex(index);
      try {
        const res = await fetch("/api/uploadConsultationFile", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assetId: ref.assetId }),
        });
        if (!res.ok) {
          const data: unknown = await res.json().catch(() => null);
          const msg =
            data &&
            typeof data === "object" &&
            "error" in data &&
            typeof (data as { error: unknown }).error === "string"
              ? (data as { error: string }).error
              : "Could not remove file";
          toast.error(msg);
          return;
        }
      } catch {
        toast.error("Could not remove file. Try again.");
        return;
      } finally {
        setRemovingIndex(null);
      }
    }

    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor={inputId}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled && !isUploading) setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && !isUploading) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
          }
        }}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 px-4 py-7 border border-dashed transition-all duration-300 cursor-pointer",
          "border-white/[0.14] bg-transparent hover:border-white/28 hover:bg-white/3",
          isDragging && "border-white/35 bg-white/5",
          (disabled || isUploading) && "opacity-50 pointer-events-none cursor-not-allowed"
        )}
      >
        <input
          id={inputId}
          type="file"
          className="sr-only"
          accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
          multiple
          disabled={disabled || isUploading}
          onChange={onInputChange}
        />
        {isUploading ? (
          <Loader2 className="w-6 h-6 text-white/60 animate-spin" strokeWidth={1.25} />
        ) : (
          <Upload className="w-6 h-6 text-white/35" strokeWidth={1.25} />
        )}
        <span className="text-white/65 text-xs font-light text-center leading-relaxed px-2">
          Drag files here or{" "}
          <span className="text-white/90 underline underline-offset-4 decoration-white/25">
            browse
          </span>
        </span>
        <span className="text-white/32 text-[10px] font-medium uppercase tracking-[0.14em]">
          PDF, PNG, JPEG, WebP · max 20 MB each · up to {CONSULTATION_PLAN_MAX_FILES}{" "}
          files
        </span>
      </label>

      {error && (
        <p className="text-red-300/90 text-xs leading-snug">{error}</p>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.url}-${i}`}
              className="flex items-center justify-between gap-3 pl-3 pr-2 py-2.5 border border-white/8 bg-white/3 text-left"
            >
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 text-xs truncate min-w-0 underline-offset-2 hover:underline"
              >
                {f.filename}
              </a>
              <button
                type="button"
                onClick={() => void removeAt(i)}
                disabled={
                  disabled || isUploading || removingIndex !== null
                }
                className="shrink-0 p-1.5 text-white/45 hover:text-white transition-colors rounded-none disabled:opacity-40"
                aria-label={`Remove ${f.filename}`}
              >
                {removingIndex === i ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
