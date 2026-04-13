import { NextResponse } from "next/server";

const CALENDLY_API_BASE = "https://api.calendly.com";

export async function GET() {
  const apiKey = process.env.CALENDLY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Calendly API key not configured" },
      { status: 500 }
    );
  }

  try {
    const userRes = await fetch(`${CALENDLY_API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!userRes.ok) {
      throw new Error("Failed to fetch Calendly user");
    }

    const userData = await userRes.json();
    const userUri = userData.resource.uri;

    const eventsRes = await fetch(
      `${CALENDLY_API_BASE}/event_types?user=${encodeURIComponent(userUri)}&active=true`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    if (!eventsRes.ok) {
      throw new Error("Failed to fetch event types");
    }

    const eventsData = await eventsRes.json();
    const eventTypes = eventsData.collection;

    if (!eventTypes || eventTypes.length === 0) {
      return NextResponse.json(
        { error: "No active event types found" },
        { status: 404 }
      );
    }

    const eventType = eventTypes[0];

    return NextResponse.json({
      schedulingUrl: eventType.scheduling_url,
      eventTypeName: eventType.name,
    });
  } catch (error) {
    console.error("Calendly API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Calendly data" },
      { status: 500 }
    );
  }
}
