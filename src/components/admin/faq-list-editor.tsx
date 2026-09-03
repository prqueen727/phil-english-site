"use client";

export type FaqItem = { question: string; answer: string };

type FaqListEditorProps = {
  faq: FaqItem[];
  onChange: (faq: FaqItem[]) => void;
};

export default function FaqListEditor({ faq, onChange }: FaqListEditorProps) {
  function update(i: number, field: keyof FaqItem, value: string) {
    const next = faq.slice();
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  function remove(i: number) {
    onChange(faq.filter((_, idx) => idx !== i));
  }

  function add() {
    onChange([...faq, { question: "", answer: "" }]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-brand-800">FAQ</label>
        <button type="button" onClick={add} className="text-xs font-medium text-brand-600 hover:text-brand-800">
          + Add
        </button>
      </div>
      <div className="mt-2 space-y-4">
        {faq.map((item, i) => (
          <div key={i} className="rounded-lg border border-brand-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-brand-500">#{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Question"
              value={item.question}
              onChange={(e) => update(i, "question", e.target.value)}
              className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <textarea
              placeholder="Answer"
              value={item.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
