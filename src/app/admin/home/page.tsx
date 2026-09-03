"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";
import BlockListEditor, { type Block } from "@/components/admin/block-list-editor";

type HomeContent = {
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  introImageUrl: string;
  highlights: string;
  ctaTitle: string;
  ctaBody: string;
};

export default function AdminHomePage() {
  const [home, setHome] = useState<HomeContent | null>(null);
  const [highlights, setHighlights] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/home")
      .then((r) => r.json())
      .then((data) => {
        setHome(data);
        try {
          setHighlights(JSON.parse(data.highlights || "[]"));
        } catch {
          setHighlights([]);
        }
      });
  }, []);

  async function save() {
    if (!home) return;
    setSaving(true);
    await fetch("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...home, highlights: JSON.stringify(highlights) }),
    });
    setSaving(false);
  }

  if (!home) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Home Page</h1>

      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-brand-100 bg-ivory-50 p-6">
        <div>
          <label className="block text-sm font-medium text-brand-800">Eyebrow (small label above heading)</label>
          <input
            type="text"
            value={home.introEyebrow}
            onChange={(e) => setHome({ ...home, introEyebrow: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Introduction Title</label>
          <input
            type="text"
            value={home.introTitle}
            onChange={(e) => setHome({ ...home, introTitle: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Introduction Body</label>
          <textarea
            value={home.introBody}
            onChange={(e) => setHome({ ...home, introBody: e.target.value })}
            rows={5}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <ImageUploader
          label="Introduction Image"
          value={home.introImageUrl}
          onChange={(url) => setHome({ ...home, introImageUrl: url })}
        />

        <BlockListEditor
          label="Highlights (3 short feature cards)"
          blocks={highlights}
          onChange={setHighlights}
        />

        <div>
          <label className="block text-sm font-medium text-brand-800">Call-to-Action Title</label>
          <input
            type="text"
            value={home.ctaTitle}
            onChange={(e) => setHome({ ...home, ctaTitle: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Call-to-Action Body</label>
          <textarea
            value={home.ctaBody}
            onChange={(e) => setHome({ ...home, ctaBody: e.target.value })}
            rows={2}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-brand-700 px-6 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
