const SKIN_TONES = ["#E8B98F", "#C68863", "#8D5A3B", "#5C3A24", "#F2D3B3"];
const HAIR_COLORS = ["#241E14", "#4A3420", "#141210", "#6B4A2E", "#2E241C"];
const BG_TONES = ["#EEEBE3", "#E0B39D", "#D9C9B8", "#C9CBC0", "#E6D5C3", "#D8C4C7"];
const GARMENT_TONES = ["#C25E3A", "#3A3C2E", "#7A2A3A", "#33465A", "#8C7A5E"];

function hairPath(variant: number): string {
  switch (variant) {
    case 0: // short crop
      return "M28,34 C28,16 72,16 72,34 L72,42 C60,30 40,30 28,42 Z";
    case 1: // bob
      return "M26,32 C26,14 74,14 74,32 L76,64 L64,58 L64,36 L36,36 L36,58 L24,64 Z";
    case 2: // curly
      return "M26,36 C22,20 30,10 40,12 C42,4 58,4 60,12 C70,10 78,20 74,36 C78,26 84,32 80,42 C76,32 70,40 66,30 C58,38 42,38 34,30 C30,40 24,32 20,42 C16,32 22,26 26,36 Z";
    case 3: // bun
      return "M28,34 C28,17 72,17 72,34 L72,40 L28,40 Z M42,10 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0";
    default: // long
      return "M26,32 C26,14 74,14 74,32 L80,86 L66,80 L64,36 L36,36 L34,80 L20,86 Z";
  }
}

export function AvatarArt({ seed, alt, className = "" }: { seed: number; alt: string; className?: string }) {
  const skin = SKIN_TONES[seed % SKIN_TONES.length];
  const hair = HAIR_COLORS[(seed + 2) % HAIR_COLORS.length];
  const bg = BG_TONES[(seed * 3) % BG_TONES.length];
  const garment = GARMENT_TONES[seed % GARMENT_TONES.length];

  return (
    <div className={`relative overflow-hidden ${className}`} role="img" aria-label={alt}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <rect width="100" height="100" fill={bg} />
        <path d="M20,100 C20,76 33,64 50,64 C67,64 80,76 80,100 Z" fill={garment} />
        <circle cx="50" cy="46" r="21" fill={skin} />
        <path d={hairPath(seed % 5)} fill={hair} />
      </svg>
    </div>
  );
}
