import { NextResponse } from "next/server";

import {
  CONSULTATION_PLAN_MAX_BYTES,
  CONSULTATION_PLAN_ALLOWED_MIME_TYPES,
} from "@/lib/consultation-upload-config";
import {
  getSanityWriteClient,
  getSanityWriteToken,
} from "@/sanity/lib/writeClient";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!getSanityWriteToken()) {
      return NextResponse.json(
        { error: "File uploads are not configured" },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const entry = formData.get("file");
    if (!entry || !(entry instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const type = entry.type;
    if (!type || !CONSULTATION_PLAN_ALLOWED_MIME_TYPES.has(type)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Use PDF, PNG, JPEG, or WebP.",
        },
        { status: 400 }
      );
    }

    if (entry.size > CONSULTATION_PLAN_MAX_BYTES) {
      return NextResponse.json(
        { error: "File is too large (max 20 MB)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await entry.arrayBuffer());
    const client = getSanityWriteClient();
    const asset = await client.assets.upload("file", buffer, {
      filename: entry.name,
      contentType: type,
    });

    const url = asset.url;
    const assetId = asset._id;
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Upload succeeded but no URL was returned" },
        { status: 500 }
      );
    }
    if (!assetId || typeof assetId !== "string") {
      return NextResponse.json(
        { error: "Upload succeeded but no asset id was returned" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url,
      filename: entry.name,
      assetId,
    } satisfies { url: string; filename: string; assetId: string });
  } catch (e) {
    console.error("uploadConsultationFile:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

function isSanityFileAssetId(id: string): boolean {
  if (id.length < 8 || id.length > 256 || !id.startsWith("file-")) {
    return false;
  }
  // Sanity file asset ids; reject obvious injection / weird control chars
  return !/[\s<>"'`\\]/.test(id);
}

export async function DELETE(request: Request) {
  try {
    if (!getSanityWriteToken()) {
      return NextResponse.json(
        { error: "File uploads are not configured" },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const assetId =
      body &&
      typeof body === "object" &&
      "assetId" in body &&
      typeof (body as { assetId: unknown }).assetId === "string"
        ? (body as { assetId: string }).assetId.trim()
        : "";

    if (!assetId || !isSanityFileAssetId(assetId)) {
      return NextResponse.json({ error: "Invalid asset id" }, { status: 400 });
    }

    const client = getSanityWriteClient();
    await client.delete(assetId);

    return NextResponse.json({ ok: true as const });
  } catch (e) {
    console.error("uploadConsultationFile DELETE:", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
