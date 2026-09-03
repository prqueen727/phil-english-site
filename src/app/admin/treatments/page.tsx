"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Treatment = { id: string; slug: string; name: string; published: boolean; order: number };

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  function load() {
    fetch("/api/admin/treatments")
      .then((r) => r.json())
      .then(setTreatments);
  }

  useEffect(load, []);

  async function createTreatment(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    await fetch("/api/admin/treatments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setNewName("");
    setCreating(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this treatment page? This cannot be undone.")) return;
    await fetch(`/api/admin/treatments/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Treatments</h1>

      <form onSubmit={createTreatment} className="mt-6 flex max-w-md gap-2">
        <input
          type="text"
          placeholder="New treatment name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={creating}
          className="rounded-full bg-brand-700 px-5 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800 disabled:opacity-60"
        >
          Add
        </button>
      </form>

      <div className="mt-8 divide-y divide-brand-100 rounded-xl border border-brand-100 bg-ivory-50">
        {treatments.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-brand-900">{t.name}</p>
              <p className="text-xs text-brand-500">/treatments/{t.slug}{!t.published && " · draft"}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href={`/admin/treatments/${t.id}`}
                className="text-sm font-medium text-brand-600 hover:text-brand-900"
              >
                Edit
              </Link>
              <button
                onClick={() => remove(t.id)}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {treatments.length === 0 && (
          <p className="p-4 text-sm text-brand-500">No treatments yet.</p>
        )}
      </div>
    </div>
  );
}
