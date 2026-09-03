"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";

type Doctor = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  order: number;
};

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newName, setNewName] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/doctors")
      .then((r) => r.json())
      .then(setDoctors);
  }

  useEffect(load, []);

  function update(id: string, field: keyof Doctor, value: string) {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  }

  async function save(doctor: Doctor) {
    setSavingId(doctor.id);
    await fetch(`/api/admin/doctors/${doctor.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });
    setSavingId(null);
  }

  async function addDoctor(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setNewName("");
    load();
  }

  async function remove(id: string) {
    if (!confirm("Remove this doctor?")) return;
    await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Doctors</h1>

      <form onSubmit={addDoctor} className="mt-6 flex max-w-md gap-2">
        <input
          type="text"
          placeholder="New doctor's name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-700 px-5 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800"
        >
          Add
        </button>
      </form>

      <div className="mt-8 space-y-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="rounded-xl border border-brand-100 bg-ivory-50 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-brand-900">{doctor.name || "Untitled"}</h2>
              <button onClick={() => remove(doctor.id)} className="text-sm text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-800">Name</label>
                <input
                  type="text"
                  value={doctor.name}
                  onChange={(e) => update(doctor.id, "name", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800">Title / Role</label>
                <input
                  type="text"
                  value={doctor.title}
                  onChange={(e) => update(doctor.id, "title", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-800">Bio</label>
                <textarea
                  value={doctor.bio}
                  onChange={(e) => update(doctor.id, "bio", e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>
              <ImageUploader
                label="Photo"
                value={doctor.photoUrl}
                onChange={(url) => update(doctor.id, "photoUrl", url)}
              />
              <button
                onClick={() => save(doctor)}
                disabled={savingId === doctor.id}
                className="rounded-full bg-brand-700 px-6 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800 disabled:opacity-60"
              >
                {savingId === doctor.id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
