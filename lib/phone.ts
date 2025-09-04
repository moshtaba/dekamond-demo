/** Iranian mobile formats supported:
 * - 09xxxxxxxxx
 * - +989xxxxxxxxx
 * - 00989xxxxxxxxx
 */
export const IR_MOBILE_REGEX = /^(?:09\d{9}|\+989\d{9}|00989\d{9})$/;

/** Returns true if `input` matches accepted Iranian mobile formats. */
export function isValidIranMobile(input: string): boolean {
  return IR_MOBILE_REGEX.test(input.trim());
}

/** Normalize to E.164 (+989XXXXXXXXX). */
export function normalizeIranMobile(input: string): string {
  const v = input.trim();
  if (v.startsWith("+989")) return v;
  if (v.startsWith("00989")) return "+" + v.slice(2);
  if (v.startsWith("09")) return "+989" + v.slice(2);
  return v; // assume upstream validated
}
