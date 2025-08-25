import { rankToOrder } from 'constants/data/BeltRanks';

/**
 * Order an array of items by belt rank using the provided belt requirements ordering.
 *
 * Generic T allows this function to accept any item shape. Caller must provide a
 * function to extract the belt rank string from each item.
 *
 * @param items - array of items to sort
 * @param getBeltRank - function that returns the belt rank string for an item (e.g. "White", "Yellow")
 * @param beltRequirements - array of `BeltRequirements` objects that contain numeric `beltOrder` and `beltRank` values
 * @returns a new array with items sorted by belt order (stable)
 */
//remove string `belt` if it is exists
export const beltNormalizer = (s: string | undefined | null) =>
  (s || '')
    .toString()
    .toLowerCase()
    .replace(/\s+belt$/i, '')
    .trim();

export function orderByBeltRank<T extends { beltRank?: string | null }>(
  items: T[],
  // extractor is optional — by convention items have a `beltRank` property
  getBeltRank: ((item: T) => string | undefined | null) | undefined
): T[] {
  if (!Array.isArray(items) || items.length === 0) return [];

  // Use provided extractor or default to the `beltRank` property on the item
  const getter =
    getBeltRank ?? ((it: T) => (it && (it as any).beltRank) as string | undefined | null);

  // Stable sort: attach original index
  const orderedList = items
    .map((item, idx) => ({ item, idx, key: beltNormalizer(getter(item)) }))
    .sort((a, b) => {
      const oa = rankToOrder.has(a.key) ? rankToOrder.get(a.key)! : Number.MAX_SAFE_INTEGER;
      const ob = rankToOrder.has(b.key) ? rankToOrder.get(b.key)! : Number.MAX_SAFE_INTEGER;
      if (oa !== ob) return oa - ob;
      return a.idx - b.idx;
    })
    .map((x) => x.item);

  return orderedList;
}

export default orderByBeltRank;
