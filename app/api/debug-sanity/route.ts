import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export async function GET() {
  try {
    const data = await client.fetch(
      `*[_type == "home" && (pageName == "home" || !defined(pageName))][0]{
        _id,
        title,
        pageName,
        img{
          _type,
          asset,
          "imgAlt": imgAlt,
          hotspot
        }
      }`
    );

    const imageUrl = data?.img ? urlFor(data.img)?.url() ?? null : null;

    return NextResponse.json({
      success: true,
      data,
      imageUrl,
      hasImg: !!data?.img,
      hasAsset: !!data?.img?.asset,
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
