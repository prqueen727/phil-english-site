export type FamTourCase = {
  slug: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
};

// Ordered newest first — the homepage teaser shows the first 3, the Fam Tour
// Cases archive page shows all of them.
export const famTourCases: FamTourCase[] = [
  {
    slug: "usfk-spring-palooza-outreach",
    title: "USFK Spring Palooza Outreach",
    date: "May 16, 2026",
    description:
      "Phil Hospital of Korean Medicine took part in United States Forces Korea's \"Spring Palooza\" event at Camp Humphreys, Pyeongtaek, offering free consultations, including Sasang constitutional type diagnosis.",
    imageUrl: "/uploads/famtour-case-usfk-spring-palooza.jpg",
  },
  {
    slug: "usfk-fam-tour",
    title: "USFK Fam Tour",
    date: "May 2026",
    description:
      "17 United States Forces Korea (USFK) service members from Camp Humphreys, Pyeongtaek, visited Phil Hospital of Korean Medicine for a hands-on fam tour — including herbal tea tasting, one-on-one consultations, Chuna manual therapy, and acupuncture.",
    imageUrl: "/uploads/famtour-case-usfk.jpg",
  },
  {
    slug: "paichai-university-fam-tour",
    title: "Paichai University Chinese International Student Fam Tour",
    date: "November 2023",
    description: "A fam tour hosted for Chinese international students from Paichai University.",
    imageUrl: "/uploads/famtour-case-paichai.jpg",
  },
  {
    slug: "singapore-medical-tourism-fam-tour",
    title: "Singapore Medical Tourism Fam Tour",
    date: "August 2023",
    description: "A fam tour hosted for a Singapore medical tourism delegation.",
    imageUrl: "/uploads/famtour-case-singapore.jpg",
  },
  {
    slug: "multicultural-family-fam-tour",
    title: "Multicultural Family Medical Tourism Fam Tour",
    date: "October 2019",
    description: "A fam tour hosted for multicultural families as part of a medical tourism program.",
    imageUrl: "/uploads/famtour-case-multicultural.jpg",
  },
];
