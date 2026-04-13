import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.CALENDLY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Calendly API key not configured" },
      { status: 500 }
    );
  }

  const inviteeUri = request.nextUrl.searchParams.get("uri");

  if (!inviteeUri) {
    return NextResponse.json(
      { error: "Missing invitee URI" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(inviteeUri, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch invitee");
    }

    const data = await res.json();
    const invitee = data.resource;

    return NextResponse.json({
      name: invitee.name,
      email: invitee.email,
    });
  } catch (error) {
    console.error("Calendly invitee API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invitee details" },
      { status: 500 }
    );
  }
}
