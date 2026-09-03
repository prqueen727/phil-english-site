export type TextBlock = { title: string; body: string };
export type FaqItem = { question: string; answer: string };
export type HeroSlide = { title: string; subtitle: string };

export function parseBlocks(json: string): TextBlock[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseStringList(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseFaq(json: string): FaqItem[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseHeroSlides(json: string): HeroSlide[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
