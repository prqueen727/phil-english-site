"use client";

type StringListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
};

export default function StringListEditor({ label, items, onChange }: StringListEditorProps) {
  function update(i: number, value: string) {
    const next = items.slice();
    next[i] = value;
    onChange(next);
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function add() {
    onChange([...items, ""]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-brand-800">{label}</label>
        <button type="button" onClick={add} className="text-xs font-medium text-brand-600 hover:text-brand-800">
          + Add
        </button>
      </div>
      <div className="mt-2 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded-lg border border-brand-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button type="button" onClick={() => remove(i)} className="text-xs text-red-600 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
