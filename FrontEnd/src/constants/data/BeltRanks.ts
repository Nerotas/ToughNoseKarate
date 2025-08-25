import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

//order VERY unlikley to change
export const BELT_RANKS: Partial<BeltRequirements>[] = [
  {
    beltOrder: 1,
    beltRank: 'White',
  },
  {
    beltOrder: 2,
    beltRank: 'Gold White',
  },
  {
    beltOrder: 3,
    beltRank: 'Gold',
  },
  {
    beltOrder: 4,
    beltRank: 'Gold Black',
  },
  {
    beltOrder: 5,
    beltRank: 'Purple White',
  },
  {
    beltOrder: 6,
    beltRank: 'Purple',
  },
  {
    beltOrder: 7,
    beltRank: 'Orange White',
  },
  {
    beltOrder: 8,
    beltRank: 'Orange',
  },
  {
    beltOrder: 9,
    beltRank: 'Blue White',
  },
  {
    beltOrder: 10,
    beltRank: 'Blue',
  },
  {
    beltOrder: 11,
    beltRank: 'Blue Black',
  },
  {
    beltOrder: 12,
    beltRank: 'Green White',
  },
  {
    beltOrder: 13,
    beltRank: 'Green',
  },
  {
    beltOrder: 14,
    beltRank: 'Green Black',
  },
  {
    beltOrder: 15,
    beltRank: 'Brown White',
  },
  {
    beltOrder: 16,
    beltRank: 'Brown',
  },
  {
    beltOrder: 17,
    beltRank: 'Brown Black',
  },
  {
    beltOrder: 18,
    beltRank: 'Red White',
  },
  {
    beltOrder: 19,
  },
  {
    beltOrder: 20,
    beltRank: 'Red Black',
  },
  {
    beltOrder: 21,
    beltRank: '1st Black',
  },
];
// Build lookup map from beltNormalized beltRank -> order number
const beltNormalizer = (s: string | undefined | null) =>
  (s || '')
    .toString()
    .toLowerCase()
    .replace(/\s+belt$/i, '')
    .trim();

export const rankToOrder = new Map<string, number>();
BELT_RANKS.forEach((br) => {
  const key = beltNormalizer(br.beltRank);
  const order =
    typeof (br as any).beltOrder === 'number' ? (br as any).beltOrder : Number.MAX_SAFE_INTEGER;
  rankToOrder.set(key, order);
});
