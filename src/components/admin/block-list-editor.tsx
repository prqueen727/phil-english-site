"use client";

export type Block = { title: string; body: string };

type BlockListEditorProps = {
  label: string;
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
  bodyLabel?: string;
};

export default function BlockListEditor({ label, blocks, onChange, bodyLabel = "Text" }: BlockListEditorProps) {
  function update(i: number, field: keyof Block, value: string) {
    const next = blocks.slice();
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  function add() {
    onChange([...blocks, { title: "", body: "" }]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-brand-800">{label}</label>
        <button
          type="button"
          onClick={add}
          className="text-xs font-medium text-brand-600 hover:text-brand-800"
        >
          + Add
        </button>
      </div>
      <div className="mt-2 space-y-4">
        {blocks.map((block, i) => (
          <div key={i} className="rounded-lg border border-brand-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-brand-500">#{i + 1}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={block.title}
              onChange={(e) => update(i, "title", e.target.value)}
              className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
            />
            <textarea
              placeholder={bodyLabel}
              value={block.body}
              onChange={(e) => update(i, "body", e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
