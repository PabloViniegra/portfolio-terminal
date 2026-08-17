export const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const curr = Array.from({ length: b.length + 1 }, () => 0);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + cost,
      );
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
};

export const suggestClosestCommand = (
  input: string,
  commands: readonly string[],
): string | null => {
  const target = input.trim().toLowerCase().replace(/^\//, '');
  if (!target) return null;
  let best: string | null = null;
  let bestDist = Infinity;
  for (const cmd of commands) {
    const stem = cmd.replace(/^\//, '');
    const dist = levenshtein(target, stem);
    if (dist < bestDist) {
      bestDist = dist;
      best = cmd;
    }
  }
  return bestDist <= 2 ? best : null;
};
