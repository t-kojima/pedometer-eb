export type Rarity = 'common' | 'normal' | 'uncommon' | 'rare' | 'unknown';
export type Lot = {
  isLot: boolean;
  rarity: Rarity;
};
