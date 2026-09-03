import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const doctors = await prisma.doctor.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(doctors);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  const count = await prisma.doctor.count();
  const doctor = await prisma.doctor.create({ data: { name, order: count } });
  return NextResponse.json(doctor);
}
