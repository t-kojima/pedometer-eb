import { Lot, Rarity } from './models/lot';

export function drawLots<T extends Lot>(source: T[]): T {
  if (!source.length) throw new Error('sourceがありません');

  const random = Math.floor(Math.random() * 100); // 0-99
  const drawSameRarity = (rarity: Rarity) => {
    const targets = source.filter((_) => _.rarity === rarity && _.isLot);
    if (!targets.length) throw new Error(`${rarity}が含まれていません`);
    const index = Math.floor(Math.random() * targets.length);
    return targets[index];
  };
  if (random <= 2) {
    // 2%
    return drawSameRarity('rare');
  } else if (random <= 12) {
    // 10%
    return drawSameRarity('uncommon');
  } else if (random <= 42) {
    // 30%
    return drawSameRarity('normal');
  } else {
    // 58%
    return drawSameRarity('common');
  }
}
