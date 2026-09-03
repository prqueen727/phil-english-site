import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const greeting = await prisma.greetingContent.findUnique({ where: { id: 1 } });
  return NextResponse.json(greeting);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const greeting = await prisma.greetingContent.update({ where: { id: 1 }, data });
  return NextResponse.json(greeting);
}
