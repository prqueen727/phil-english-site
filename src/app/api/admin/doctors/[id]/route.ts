import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { id: string };

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const data = await req.json();
  delete data.id;
  const doctor = await prisma.doctor.update({ where: { id }, data });
  return NextResponse.json(doctor);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  await prisma.doctor.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
