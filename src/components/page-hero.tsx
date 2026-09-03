"use client";

import { useEffect, useState } from "react";
import type { HeroSlide } from "@/lib/content-types";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  images?: string[];
  slides?: HeroSlide[];
  size?: "large" | "compact";
  imagePosition?: "center" | "top";
};

const ROTATE_INTERVAL_MS = 5000;

export default function PageHero({
  title,
  subtitle,
  images = [],
  slides = [],
  size = "compact",
  imagePosition = "center",
}: PageHeroProps) {
  const height = size === "large" ? "min-h-[70vh]" : "min-h-[calc(38vh+50px)]";
  const objectPosition = imagePosition === "top" ? "object-top" : "object-center";
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  const activeTitle = slides[active]?.title || title;
  const activeSubtitle = slides[active]?.subtitle || subtitle;

  return (
    <section className={`relative flex ${height} items-end overflow-hidden bg-brand-800`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${objectPosition} transition-opacity duration-1000 ${
            i === active ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-24">
        <h1 className="max-w-2xl whitespace-pre-line text-4xl font-medium text-ivory-50 md:text-5xl">
          {activeTitle}
        </h1>
        {activeSubtitle && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-100">
            {activeSubtitle}
          </p>
        )}
        {images.length > 1 && (
          <div className="mt-6 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i === active ? "bg-ivory-50" : "bg-ivory-50/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
