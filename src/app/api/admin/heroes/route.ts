import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const heroes = await prisma.pageHero.findMany({ orderBy: { slug: "asc" } });
  return NextResponse.json(heroes);
}

export async function PUT(req: NextRequest) {
  const { slug, title, subtitle, imageUrls, slides } = await req.json();
  const hero = await prisma.pageHero.update({
    where: { slug },
    data: {
      title,
      subtitle,
      imageUrls: JSON.stringify(imageUrls ?? []),
      slides: JSON.stringify(slides ?? []),
    },
  });
  return NextResponse.json(hero);
}
