import { badges } from '../data/badges';
import { signs } from '../data/signs';

interface BadgeCheckInput {
    learnedSigns: Set<number | string>;
    dailyStreak: number;
    gameStars: number;
    gameCompletions: Record<string, boolean>;
    earnedBadges: string[];
}

export const checkForNewBadges = ({
    learnedSigns,
    dailyStreak,
    gameStars,
    gameCompletions,
    earnedBadges,
}: BadgeCheckInput) => {
    const categoryCompletion = signs.reduce<Record<string, { total: number; done: number }>>((acc, sign) => {
        if (!acc[sign.category]) acc[sign.category] = { total: 0, done: 0 };
        acc[sign.category].total += 1;
        if (learnedSigns.has(sign.id)) acc[sign.category].done += 1;
        return acc;
    }, {});

    const completedCategories = Object.values(categoryCompletion).filter((c) => c.done === c.total).length;
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
                categoryCompletion[String(value)]?.done === categoryCompletion[String(value)]?.total);

        if (unlocked) earned.add(badge.id);
    });

    return [...earned];
};
