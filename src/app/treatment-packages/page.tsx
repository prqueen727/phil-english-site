import PageHero from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Treatment Packages" };

type PackageRow = { treatment: string; cost: string };
type PackageGroup = { indication: string; rows: PackageRow[] };
type PackageCategory = { category: string; groups: PackageGroup[] };

const packages: PackageCategory[] = [
  {
    category: "Spine & Joint",
    groups: [
      {
        indication: "Back pain, neck pain, poor posture, shoulder/knee pain",
        rows: [
          { treatment: "Chuna Manual Therapy", cost: "₩30,000 / ₩50,000" },
          { treatment: "Manual Therapy", cost: "₩110,000" },
          { treatment: "Acupuncture + Electroacupuncture", cost: "₩20,000" },
          { treatment: "Bee Venom Pharmacopuncture", cost: "₩20,000" },
          { treatment: "Cupping", cost: "₩10,000" },
        ],
      },
    ],
  },
  {
    category: "Immunity & Recovery",
    groups: [
      {
        indication: "Swelling after cosmetic procedures",
        rows: [{ treatment: "Herbal Decoction (blood-stasis removal, 3-day course)", cost: "Consult for pricing" }],
      },
      {
        indication: "Rhinitis or lowered immunity",
        rows: [
          { treatment: "Herbal Medicine (Gyeongokgo, 5 packs)", cost: "Consult for pricing" },
          { treatment: "Manual Therapy", cost: "₩110,000" },
          { treatment: "Chuna Manual Therapy", cost: "₩30,000 / ₩50,000" },
        ],
      },
    ],
  },
  {
    category: "Aesthetic",
    groups: [
      {
        indication: "Dry skin, wrinkles, reduced elasticity",
        rows: [{ treatment: "Facial Acupuncture", cost: "₩30,000 / ₩50,000" }],
      },
      {
        indication: "Facial asymmetry",
        rows: [
          { treatment: "Beauty Chuna (facial balancing)", cost: "₩30,000 / ₩50,000" },
          { treatment: "Physical Therapy", cost: "₩10,000" },
        ],
      },
    ],
  },
  {
    category: "Weight Management",
    groups: [
      {
        indication: "Weight loss",
        rows: [
          { treatment: "Herbal Diet Pills (1-month course)", cost: "₩90,000" },
          { treatment: "Weight-Loss Acupuncture", cost: "₩30,000 / ₩50,000" },
        ],
      },
    ],
  },
  {
    category: "Aesthetic Injections",
    groups: [
      { indication: "Anti-aging, whitening, immune support", rows: [{ treatment: "Cinderella Injection", cost: "₩15,000" }] },
      { indication: "Whitening (melanin suppression), anti-aging", rows: [{ treatment: "Baekok (Glutathione) Injection", cost: "₩20,000" }] },
      { indication: "Fatigue recovery, stamina", rows: [{ treatment: "Garlic Injection", cost: "₩20,000" }] },
      { indication: "Facial flushing, poor appetite, chronic fatigue", rows: [{ treatment: "Placenta Injection", cost: "₩20,000" }] },
      { indication: "Fatigue, nutrient deficiency", rows: [{ treatment: "Nutrient IV", cost: "₩50,000" }] },
    ],
  },
  {
    category: "Admission + Meals",
    groups: [
      {
        indication: "—",
        rows: [
          { treatment: "Multi-bed Room", cost: "₩200,000" },
          { treatment: "Premium Room", cost: "₩250,000" },
        ],
      },
    ],
  },
];

type RenderRow = {
  key: string;
  category?: string;
  categoryRowSpan?: number;
  indication?: string;
  indicationRowSpan?: number;
  treatment: string;
  cost: string;
};

function buildRows(data: PackageCategory[]): RenderRow[] {
  const rows: RenderRow[] = [];
  for (const cat of data) {
    const categoryRowSpan = cat.groups.reduce((n, g) => n + g.rows.length, 0);
    let catRowIndex = 0;
    for (const group of cat.groups) {
      group.rows.forEach((row, i) => {
        rows.push({
          key: `${cat.category}-${group.indication}-${i}`,
          category: catRowIndex === 0 ? cat.category : undefined,
          categoryRowSpan: catRowIndex === 0 ? categoryRowSpan : undefined,
          indication: i === 0 ? group.indication : undefined,
          indicationRowSpan: i === 0 ? group.rows.length : undefined,
          treatment: row.treatment,
          cost: row.cost,
        });
        catRowIndex += 1;
      });
    }
  }
  return rows;
}

export default function TreatmentPackagesPage() {
  const rows = buildRows(packages);

  return (
    <>
      <PageHero
        title="Treatment Packages"
        subtitle="Treatment packages for international patients."
        images={["/uploads/treatment-packages-banner.png"]}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="max-w-prose text-sm italic leading-relaxed text-brand-500">
          Prices are shown in Korean Won (₩) and may vary depending on the exchange rate.
        </p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-100">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-brand-50 text-brand-900">
                <th className="border-b border-brand-100 px-5 py-3 font-medium">Category</th>
                <th className="border-b border-brand-100 px-5 py-3 font-medium">Indications</th>
                <th className="border-b border-brand-100 px-5 py-3 font-medium">Treatment</th>
                <th className="border-b border-brand-100 px-5 py-3 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className="border-b border-brand-100 last:border-b-0">
                  {row.category !== undefined && (
                    <td
                      rowSpan={row.categoryRowSpan}
                      className="border-r border-brand-100 px-5 py-3 align-top font-medium text-brand-900"
                    >
                      {row.category}
                    </td>
                  )}
                  {row.indication !== undefined && (
                    <td
                      rowSpan={row.indicationRowSpan}
                      className="border-r border-brand-100 px-5 py-3 align-top text-brand-700"
                    >
                      {row.indication}
                    </td>
                  )}
                  <td className="px-5 py-3 text-brand-700">{row.treatment}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-brand-700">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-20 rounded-2xl bg-brand-800 p-10 text-center text-ivory-50">
          <h2 className="text-2xl font-medium">Questions about a treatment package?</h2>
          <p className="mt-2 text-brand-100">Send us a message and our team will follow up with you.</p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-ivory-50 px-8 py-3 text-sm font-medium text-brand-900 hover:bg-brand-100"
          >
            Contact Us
          </a>
        </section>
      </section>
    </>
  );
}
