// Normalisation et détection du motif [IDEERI] (insensible à la casse, crochets variés)

// Variantes de crochets standards et typographiques
const OPEN_BRACKETS = "[\uFF3B\u3010\u27E6\u2983\u2772"; // [ ［ 【 ⟦ ⦃ ❲
const CLOSE_BRACKETS = "]\uFF3D\u3011\u27E7\u2984\u2773"; // ] ］ 】 ⟧ ⦄ ❳

const bracketRegex = new RegExp(`[${OPEN_BRACKETS}]\\s*IDEERI\\s*[${CLOSE_BRACKETS}]`, "i");

export function containsIdeeriTag(text?: string | null): boolean {
  if (!text) return false;
  return bracketRegex.test(text);
}

export function extractUsKey(text?: string | null): string | null {
  if (!text) return null;
  const match = text.match(/\bUS[-_\s]?(\d{1,6})\b/i);
  return match ? `US-${match[1]}`.toUpperCase() : null;
}

