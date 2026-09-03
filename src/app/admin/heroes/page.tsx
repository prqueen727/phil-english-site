"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";

type HeroRow = { slug: string; title: string; subtitle: string; imageUrls: string; slides: string };
type Slide = { title: string; subtitle: string };
type Hero = { slug: string; title: string; subtitle: string; images: string[]; slides: Slide[] };

function parseJsonArray<T>(json: string): T[] {
  try {
    const parsed = JSON.parse(json || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AdminHeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/heroes")
      .then((r) => r.json())
      .then((data: HeroRow[]) => {
        setHeroes(
          data.map((h) => ({
            slug: h.slug,
            title: h.title,
            subtitle: h.subtitle,
            images: parseJsonArray<string>(h.imageUrls),
            slides: parseJsonArray<Slide>(h.slides),
          }))
        );
        setLoading(false);
      });
  }, []);

  function update(slug: string, field: "title" | "subtitle", value: string) {
    setHeroes((prev) => prev.map((h) => (h.slug === slug ? { ...h, [field]: value } : h)));
  }

  function setImage(slug: string, index: number, url: string) {
    setHeroes((prev) =>
      prev.map((h) => {
        if (h.slug !== slug) return h;
        const images = h.images.slice();
        images[index] = url;
        return { ...h, images };
      })
    );
  }

  function setSlide(slug: string, index: number, field: "title" | "subtitle", value: string) {
    setHeroes((prev) =>
      prev.map((h) => {
        if (h.slug !== slug) return h;
        const slides = h.slides.slice();
        while (slides.length <= index) slides.push({ title: "", subtitle: "" });
        slides[index] = { ...slides[index], [field]: value };
        return { ...h, slides };
      })
    );
  }

  function addSlot(slug: string) {
    setHeroes((prev) =>
      prev.map((h) => (h.slug === slug && h.images.length < 3 ? { ...h, images: [...h.images, ""] } : h))
    );
  }

  function removeSlot(slug: string, index: number) {
    setHeroes((prev) =>
      prev.map((h) =>
        h.slug === slug
          ? {
              ...h,
              images: h.images.filter((_, i) => i !== index),
              slides: h.slides.filter((_, i) => i !== index),
            }
          : h
      )
    );
  }

  async function save(hero: Hero) {
    setSavingSlug(hero.slug);
    await fetch("/api/admin/heroes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: hero.slug,
        title: hero.title,
        subtitle: hero.subtitle,
        imageUrls: hero.images.filter(Boolean),
        slides: hero.slides.slice(0, hero.images.length),
      }),
    });
    setSavingSlug(null);
  }

  if (loading) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Page Heroes</h1>
      <p className="mt-2 text-sm text-brand-600">
        Each public page has a banner at the top. Add 1 image for a static banner, or 2–3
        images for a rotating banner (images crossfade automatically every few seconds). When a
        banner has multiple images, you can give each one its own title/subtitle below — leave
        both blank on a slide to fall back to the page&apos;s main title/subtitle above.
      </p>

      <div className="mt-8 space-y-8">
        {heroes.map((hero) => (
          <div key={hero.slug} className="rounded-xl border border-brand-100 bg-ivory-50 p-6">
            <h2 className="font-medium capitalize text-brand-900">{hero.slug} page</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-800">Title</label>
                <input
                  type="text"
                  value={hero.title}
                  onChange={(e) => update(hero.slug, "title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800">Subtitle</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => update(hero.slug, "subtitle", e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-brand-800">
                    Banner Images ({hero.images.length}/3)
                  </label>
                  {hero.images.length < 3 && (
                    <button
                      type="button"
                      onClick={() => addSlot(hero.slug)}
                      className="text-xs font-medium text-brand-600 hover:text-brand-800"
                    >
                      + Add image slot
                    </button>
                  )}
                </div>
                <div className="mt-2 grid gap-4 sm:grid-cols-3">
                  {hero.images.map((url, i) => (
                    <div key={i} className="space-y-2">
                      <ImageUploader
                        label={`Image ${i + 1}`}
                        value={url}
                        onChange={(newUrl) => setImage(hero.slug, i, newUrl)}
                      />
                      {hero.images.length > 1 && (
                        <>
                          <input
                            type="text"
                            placeholder="Slide title (optional)"
                            value={hero.slides[i]?.title ?? ""}
                            onChange={(e) => setSlide(hero.slug, i, "title", e.target.value)}
                            className="w-full rounded-lg border border-brand-200 px-2 py-1.5 text-xs focus:border-brand-500 focus:outline-none"
                          />
                          <textarea
                            placeholder="Slide subtitle (optional)"
                            value={hero.slides[i]?.subtitle ?? ""}
                            onChange={(e) => setSlide(hero.slug, i, "subtitle", e.target.value)}
                            rows={2}
                            className="w-full rounded-lg border border-brand-200 px-2 py-1.5 text-xs focus:border-brand-500 focus:outline-none"
                          />
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => removeSlot(hero.slug, i)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => save(hero)}
                disabled={savingSlug === hero.slug}
                className="rounded-full bg-brand-700 px-6 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800 disabled:opacity-60"
              >
                {savingSlug === hero.slug ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
