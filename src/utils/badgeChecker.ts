import { badges } from '@/data/badges';
import { signs } from '@/data/signs';

interface BadgeCheckInput {
  learnedSigns: Set<number | string>;
  dailyStreak: number;
  gameStars: number;
  gameCompletions: Record<string, boolean>;
  earnedBadges: string[];
}

// Precompute category totals since `signs` is static data
const CATEGORY_TOTALS = signs.reduce<Record<string, number>>((acc, sign) => {
  acc[sign.category] = (acc[sign.category] || 0) + 1;
  return acc;
}, {});

export const checkForNewBadges = ({
  learnedSigns,
  dailyStreak,
  gameStars,
  gameCompletions,
  earnedBadges,
}: BadgeCheckInput) => {
  // Compute how many signs are done per category in a single pass over learned signs and static data
  const categoryDone = signs.reduce<Record<string, number>>((acc, sign) => {
    if (!acc[sign.category]) acc[sign.category] = 0;
    if (learnedSigns.has(sign.id)) acc[sign.category] += 1;
    return acc; // We accrue completed counts
  }, {});

  const completedCategories = Object.keys(CATEGORY_TOTALS).filter(
    (cat) => categoryDone[cat] === CATEGORY_TOTALS[cat]
  ).length;

  const earned = new Set(earnedBadges);

  badges.forEach((badge) => {
    if (earned.has(badge.id)) return;
    const { type, value } = badge.condition;
    const unlocked =
      (type === 'signs_learned' && learnedSigns.size >= Number(value)) ||
      (type === 'categories_completed' && completedCategories >= Number(value)) ||
      (type === 'streak' && dailyStreak >= Number(value)) ||
      (type === 'stars' && gameStars >= Number(value)) ||
      (type === 'games_completed' && Object.keys(gameCompletions).length >= Number(value)) ||
      (type === 'category_complete' &&
        categoryDone[String(value)] === CATEGORY_TOTALS[String(value)]);

    if (unlocked) earned.add(badge.id);
  });

  return [...earned];
};
