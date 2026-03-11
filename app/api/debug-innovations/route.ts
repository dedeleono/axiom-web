import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const innovations = await client.fetch(
      `*[_type == "innovation"]{
        _id,
        title,
        "hasIcon": defined(icon),
        "hasImage": defined(image),
        "hasDescription": defined(description),
        icon{ asset, hotspot },
        image{ asset, hotspot },
        description
      }`
    );

    return NextResponse.json({
      success: true,
      count: innovations?.length ?? 0,
      innovations: innovations ?? [],
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "✓ set" : "✗ missing",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "✗ missing",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
