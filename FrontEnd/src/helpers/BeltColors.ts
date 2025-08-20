import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';

// Helper function to get belt color from belt requirements data
export const getBeltColor = (
  beltRank: string | null | undefined,
  beltRequirements: BeltRequirements[]
): string => {
  if (!beltRank) {
    return '#757575'; // Default grey if beltRank is null/undefined
  }

  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.color || '#757575'; // Default grey if not found
};

// Helper function to get belt text color from belt requirements data
export const getBeltTextColor = (
  beltRank: string | null | undefined,
  beltRequirements: BeltRequirements[]
): string => {
  if (!beltRank) {
    return '#FFFFFF'; // Default white if beltRank is null/undefined
  }

  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.textColor || '#FFFFFF'; // Default white if not found
};
