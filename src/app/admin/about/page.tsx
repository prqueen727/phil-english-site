"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";
import BlockListEditor, { type Block } from "@/components/admin/block-list-editor";

type AboutContent = {
  title: string;
  body: string;
  imageUrl: string;
  highlights: string;
  missionBlocks: string;
  missionTitle: string;
  missionSubtitle: string;
  systemTitle: string;
  systemSubtitle: string;
  systemIntro: string;
  systemBlocks: string;
};

function parseJsonBlocks(json: string): Block[] {
  try {
    const parsed = JSON.parse(json || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [highlightBlocks, setHighlightBlocks] = useState<Block[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [systemBlocks, setSystemBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((data) => {
        setAbout(data);
        setHighlightBlocks(parseJsonBlocks(data.highlights));
        setBlocks(parseJsonBlocks(data.missionBlocks));
        setSystemBlocks(parseJsonBlocks(data.systemBlocks));
      });
  }, []);

  async function save() {
    if (!about) return;
    setSaving(true);
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...about,
        highlights: JSON.stringify(highlightBlocks),
        missionBlocks: JSON.stringify(blocks),
        systemBlocks: JSON.stringify(systemBlocks),
      }),
    });
    setSaving(false);
  }

  if (!about) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">About Page</h1>

      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-brand-100 bg-ivory-50 p-6">
        <div>
          <label className="block text-sm font-medium text-brand-800">Title</label>
          <input
            type="text"
            value={about.title}
            onChange={(e) => setAbout({ ...about, title: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Body</label>
          <textarea
            value={about.body}
            onChange={(e) => setAbout({ ...about, body: e.target.value })}
            rows={6}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <ImageUploader
          label="Image"
          value={about.imageUrl}
          onChange={(url) => setAbout({ ...about, imageUrl: url })}
        />
        <BlockListEditor label="Highlight Cards (under the intro)" blocks={highlightBlocks} onChange={setHighlightBlocks} />

        <div className="border-t border-brand-100 pt-6">
          <p className="font-medium text-brand-900">Our Mission Section</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-800">Eyebrow (e.g. &quot;Our Mission&quot;)</label>
              <input
                type="text"
                value={about.missionTitle}
                onChange={(e) => setAbout({ ...about, missionTitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800">Heading</label>
              <input
                type="text"
                value={about.missionSubtitle}
                onChange={(e) => setAbout({ ...about, missionSubtitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <BlockListEditor label="Mission Blocks" blocks={blocks} onChange={setBlocks} />
          </div>
        </div>

        <div className="border-t border-brand-100 pt-6">
          <p className="font-medium text-brand-900">Our System Section</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-800">Eyebrow (e.g. &quot;Our System&quot;)</label>
              <input
                type="text"
                value={about.systemTitle}
                onChange={(e) => setAbout({ ...about, systemTitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800">Heading</label>
              <input
                type="text"
                value={about.systemSubtitle}
                onChange={(e) => setAbout({ ...about, systemSubtitle: e.target.value })}
                className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-800">Intro text</label>
              <textarea
                value={about.systemIntro}
                onChange={(e) => setAbout({ ...about, systemIntro: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>
            <BlockListEditor label="System Blocks" blocks={systemBlocks} onChange={setSystemBlocks} />
          </div>
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
