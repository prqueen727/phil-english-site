"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/image-uploader";
import BlockListEditor, { type Block } from "@/components/admin/block-list-editor";
import StringListEditor from "@/components/admin/string-list-editor";
import FaqListEditor, { type FaqItem } from "@/components/admin/faq-list-editor";

type Clinic = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  imageUrl: string;
  published: boolean;
  compareLeftTitle: string;
  compareRightTitle: string;
};

export default function AdminClinicEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [principleBlocks, setPrincipleBlocks] = useState<Block[]>([]);
  const [processSteps, setProcessSteps] = useState<Block[]>([]);
  const [compareLeft, setCompareLeft] = useState<string[]>([]);
  const [compareRight, setCompareRight] = useState<string[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/clinics/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setClinic(data);
        setPrincipleBlocks(JSON.parse(data.principleBlocks || "[]"));
        setProcessSteps(JSON.parse(data.processSteps || "[]"));
        setCompareLeft(JSON.parse(data.compareLeft || "[]"));
        setCompareRight(JSON.parse(data.compareRight || "[]"));
        setFaq(JSON.parse(data.faq || "[]"));
      });
  }, [id]);

  async function save() {
    if (!clinic) return;
    setSaving(true);
    await fetch(`/api/admin/clinics/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...clinic,
        principleBlocks: JSON.stringify(principleBlocks),
        processSteps: JSON.stringify(processSteps),
        compareLeft: JSON.stringify(compareLeft),
        compareRight: JSON.stringify(compareRight),
        faq: JSON.stringify(faq),
      }),
    });
    setSaving(false);
  }

  async function remove() {
    if (!confirm("Delete this clinic page? This cannot be undone.")) return;
    await fetch(`/api/admin/clinics/${id}`, { method: "DELETE" });
    router.push("/admin/clinics");
  }

  if (!clinic) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-brand-900">Edit: {clinic.name}</h1>
        <button onClick={remove} className="text-sm font-medium text-red-600 hover:underline">
          Delete Page
        </button>
      </div>

      <div className="mt-8 max-w-2xl space-y-8">
        <section className="space-y-4 rounded-xl border border-brand-100 bg-ivory-50 p-6">
          <h2 className="font-medium text-brand-900">Basics</h2>
          <div>
            <label className="block text-sm font-medium text-brand-800">Name</label>
            <input
              type="text"
              value={clinic.name}
              onChange={(e) => setClinic({ ...clinic, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-800">Summary</label>
            <textarea
              value={clinic.summary}
              onChange={(e) => setClinic({ ...clinic, summary: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
          <ImageUploader
            label="Image"
            value={clinic.imageUrl}
            onChange={(url) => setClinic({ ...clinic, imageUrl: url })}
          />
          <label className="flex items-center gap-2 text-sm text-brand-800">
            <input
              type="checkbox"
              checked={clinic.published}
              onChange={(e) => setClinic({ ...clinic, published: e.target.checked })}
            />
            Published (visible on the public site)
          </label>
        </section>

        <section className="rounded-xl border border-brand-100 bg-ivory-50 p-6">
          <BlockListEditor
            label="Approach (why this clinic works this way)"
            blocks={principleBlocks}
            onChange={setPrincipleBlocks}
          />
        </section>

        <section className="rounded-xl border border-brand-100 bg-ivory-50 p-6">
          <BlockListEditor
            label="Care Process (steps)"
            blocks={processSteps}
            onChange={setProcessSteps}
            bodyLabel="Step description"
          />
        </section>

        <section className="space-y-4 rounded-xl border border-brand-100 bg-ivory-50 p-6">
          <h2 className="font-medium text-brand-900">Comparison</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Left column title"
              value={clinic.compareLeftTitle}
              onChange={(e) => setClinic({ ...clinic, compareLeftTitle: e.target.value })}
              className="rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Right column title"
              value={clinic.compareRightTitle}
              onChange={(e) => setClinic({ ...clinic, compareRightTitle: e.target.value })}
              className="rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StringListEditor label="Left column points" items={compareLeft} onChange={setCompareLeft} />
            <StringListEditor label="Right column points" items={compareRight} onChange={setCompareRight} />
          </div>
        </section>

        <section className="rounded-xl border border-brand-100 bg-ivory-50 p-6">
          <FaqListEditor faq={faq} onChange={setFaq} />
        </section>

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
