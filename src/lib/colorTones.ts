/** Maps a variant color name to the [light, dark] tone pair used for the
 * live color-preview interaction on the PDP gallery. */
export const COLOR_TONES: Record<string, [string, string]> = {
  Rust: ["#C25E3A", "#8C4128"],
  Ink: ["#3A3C2E", "#14120F"],
  Bone: ["#D8C9AE", "#B7A98A"],
  Olive: ["#4A4D3A", "#242619"],
  "Denim Blue": ["#5C7285", "#33465A"],
  Indigo: ["#3B4A5A", "#202B36"],
  Berry: ["#7A2A3A", "#3E1420"],
  Black: ["#1A1712", "#0D0C09"],
};

export function getColorTone(color: string | undefined, fallback: [string, string]): [string, string] {
  if (!color) return fallback;
  return COLOR_TONES[color] ?? fallback;
}
