export type PricedLine = { unit_price: number; quantity: number };

/** Total in DH, rounded to the centime. */
export function cartTotal(lines: PricedLine[]): number {
  const t = lines.reduce((s, l) => s + Number(l.unit_price) * l.quantity, 0);
  return Math.round(t * 100) / 100;
}

export function cartCount(lines: { quantity: number }[]): number {
  return lines.reduce((s, l) => s + l.quantity, 0);
}
