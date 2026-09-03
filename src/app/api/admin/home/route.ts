import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const home = await prisma.homeContent.findUnique({ where: { id: 1 } });
  return NextResponse.json(home);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const home = await prisma.homeContent.update({ where: { id: 1 }, data });
  return NextResponse.json(home);
}
