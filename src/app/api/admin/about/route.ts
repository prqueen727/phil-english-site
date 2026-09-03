import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const about = await prisma.aboutContent.findUnique({ where: { id: 1 } });
  return NextResponse.json(about);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const about = await prisma.aboutContent.update({ where: { id: 1 }, data });
  return NextResponse.json(about);
}
