"use client";

import { useState } from "react";

type ImageUploaderProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUploader({ label, value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError("Upload failed. Please try a different image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-brand-800">{label}</label>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-2 h-32 w-full max-w-xs rounded-lg object-cover" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="mt-2 block text-sm text-brand-700"
      />
      {uploading && <p className="mt-1 text-xs text-brand-500">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
