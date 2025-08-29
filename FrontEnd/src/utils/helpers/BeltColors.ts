import { BELT_RANKS } from 'constants/data/BeltRanks';
import { beltNormalizer } from './orderByBeltRank';

// Helper function to get belt color from BELT_RANKS
export const getBeltColor = (beltRank: string | null | undefined): string => {
  if (!beltRank) {
    return '#757575'; // Default grey if beltRank is null/undefined
  }

  const normalizedRank = beltNormalizer(beltRank);
  const belt = BELT_RANKS.find((br) => beltNormalizer(br.beltRank) === normalizedRank);
  return belt?.color || '#757575'; // Default grey if not found
};

// Helper function to get belt text color from BELT_RANKS
export const getBeltTextColor = (beltRank: string | null | undefined): string => {
  if (!beltRank) {
    return '#FFFFFF'; // Default white if beltRank is null/undefined
  }

  const normalizedRank = beltNormalizer(beltRank);
  const belt = BELT_RANKS.find((br) => beltNormalizer(br.beltRank) === normalizedRank);
  return belt?.textColor || '#FFFFFF'; // Default white if not found
};
