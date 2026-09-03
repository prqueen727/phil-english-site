import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body as {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, phone, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
