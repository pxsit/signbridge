export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  unlockLabel: string;
  minLearnedSigns?: number;
  minDailyStreak?: number;
  minGameStars?: number;
}
