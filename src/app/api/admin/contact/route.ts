import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const contact = await prisma.contactInfo.findUnique({ where: { id: 1 } });
  return NextResponse.json(contact);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const contact = await prisma.contactInfo.update({ where: { id: 1 }, data });
  return NextResponse.json(contact);
}
