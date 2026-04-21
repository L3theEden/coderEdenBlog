// Count CJK characters as 1 word each; latin words split by whitespace.
// Reading speeds: zh 300 cpm, en 200 wpm -> both roughly 200 units/min.
export function readingTimeMinutes(text: string): number {
  const stripped = text.replace(/```[\s\S]*?```/g, ' ').replace(/[#*_>`~\-\[\]\(\)]/g, ' ');
  const cjk = (stripped.match(/[一-鿿]/g) ?? []).length;
  const latin = stripped
    .replace(/[一-鿿]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = cjk / 300 + latin / 200;
  return Math.max(1, Math.round(minutes));
}

export function readingTimeLabel(minutes: number): string {
  return `${minutes} min read · 约 ${minutes} 分钟`;
}
