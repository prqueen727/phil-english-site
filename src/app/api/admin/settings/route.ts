import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return NextResponse.json(settings ?? { logoUrl: "" });
}

export async function PUT(req: NextRequest) {
  const { logoUrl } = await req.json();
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { logoUrl },
    create: { id: 1, logoUrl },
  });
  return NextResponse.json(settings);
}
