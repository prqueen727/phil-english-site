import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { id: string };

export async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const treatment = await prisma.treatment.findUnique({ where: { id } });
  if (!treatment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(treatment);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const data = await req.json();
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  const treatment = await prisma.treatment.update({ where: { id }, data });
  return NextResponse.json(treatment);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  await prisma.treatment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
