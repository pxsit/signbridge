import { badges } from '../data/badges';
import { signs } from '../data/signs';

export const checkForNewBadges = ({ learnedSigns, dailyStreak, gameStars, gameCompletions, earnedBadges }) => {
    const categoryCompletion = signs.reduce((acc, sign) => {
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
            (type === 'signs_learned' && learnedSigns.size >= value) ||
            (type === 'categories_completed' && completedCategories >= value) ||
            (type === 'streak' && dailyStreak >= value) ||
            (type === 'stars' && gameStars >= value) ||
            (type === 'games_completed' && Object.keys(gameCompletions).length >= value) ||
            (type === 'category_complete' && categoryCompletion[value]?.done === categoryCompletion[value]?.total);

        if (unlocked) earned.add(badge.id);
    });

    return [...earned];
};
