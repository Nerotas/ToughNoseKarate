import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

//order VERY unlikely to change
export const BELT_RANKS: Partial<BeltRequirements>[] = [
  {
    beltOrder: 1,
    beltRank: 'White',
    color: '#FFFFFF',
    textColor: '#000000',
  },
  {
    beltOrder: 2,
    beltRank: 'Gold White',
    color: '#FFD700',
    textColor: '#000000',
  },
  {
    beltOrder: 3,
    beltRank: 'Gold',
    color: '#FFD700',
    textColor: '#000000',
  },
  {
    beltOrder: 4,
    beltRank: 'Gold Black',
    color: '#DAA520',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 5,
    beltRank: 'Purple White',
    color: '#800080',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 6,
    beltRank: 'Purple',
    color: '#800080',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 7,
    beltRank: 'Orange White',
    color: '#FFA500',
    textColor: '#000000',
  },
  {
    beltOrder: 8,
    beltRank: 'Orange',
    color: '#FFA500',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 9,
    beltRank: 'Blue White',
    color: '#ADD8E6',
    textColor: '#000000',
  },
  {
    beltOrder: 10,
    beltRank: 'Blue',
    color: '#0000FF',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 11,
    beltRank: 'Blue Black',
    color: '#191970',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 12,
    beltRank: 'Green White',
    color: '#90EE90',
    textColor: '#000000',
  },
  {
    beltOrder: 13,
    beltRank: 'Green',
    color: '#008000',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 14,
    beltRank: 'Green Black',
    color: '#006400',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 15,
    beltRank: 'Brown White',
    color: '#D2691E',
    textColor: '#000000',
  },
  {
    beltOrder: 16,
    beltRank: 'Brown',
    color: '#8B4513',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 17,
    beltRank: 'Brown Black',
    color: '#654321',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 18,
    beltRank: 'Red White',
    color: '#FFB6C1',
    textColor: '#000000',
  },
  {
    beltOrder: 19,
    beltRank: 'Red',
    color: '#FF0000',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 20,
    beltRank: 'Red Black',
    color: '#FF0000',
    textColor: '#FFFFFF',
  },
  {
    beltOrder: 21,
    beltRank: '1st Black',
    color: '#000000',
    textColor: '#FFFFFF',
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
