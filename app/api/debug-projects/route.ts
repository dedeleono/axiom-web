import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export async function GET() {
  try {
    const projects = await client.fetch(
      `*[_type == "project"] | order(order asc) {
        _id,
        title,
        subtitle,
        projectSlug,
        image {
          _type,
          asset,
          imgAlt,
          hotspot
        }
      }`
    );

    const withImageUrl = (projects ?? []).map((p: { image?: { asset?: unknown } }) => {
      const url = p?.image ? urlFor(p.image)?.url() ?? null : null;
      return { ...p, imageUrl: url, hasAsset: !!p?.image?.asset };
    });

    return NextResponse.json({
      success: true,
      count: projects?.length ?? 0,
      projects: withImageUrl,
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
