"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-6 text-sm text-brand-800">
        Thank you — your message has been sent. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-800">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 bg-ivory-50 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-brand-200 bg-ivory-50 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-800">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-brand-200 bg-ivory-50 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-brand-200 bg-ivory-50 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brand-700 px-8 py-3 text-sm font-medium text-ivory-50 transition-colors hover:bg-brand-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
