import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clinics = await prisma.clinic.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(clinics);
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  let slug = slugify(name);
  let suffix = 1;
  while (await prisma.clinic.findUnique({ where: { slug } })) {
    slug = `${slugify(name)}-${suffix++}`;
  }

  const count = await prisma.clinic.count();
  const clinic = await prisma.clinic.create({
    data: { name, slug, order: count },
  });
  return NextResponse.json(clinic);
}
