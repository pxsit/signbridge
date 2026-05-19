import { describe, it, expect, vi } from 'vitest';
import { checkForNewBadges } from './badgeChecker';

// Mocking module dependencies for isolated tests
vi.mock('../data/badges', () => ({
    badges: [
        { id: 'b1', condition: { type: 'signs_learned', value: 5 } },
        { id: 'b2', condition: { type: 'streak', value: 3 } },
        { id: 'b3', condition: { type: 'stars', value: 10 } },
    ],
}));

vi.mock('../data/signs', () => ({
    signs: [
        { id: 's1', category: 'basics' },
        { id: 's2', category: 'basics' },
    ],
}));

describe('badgeChecker', () => {
    it('grants signs_learned badge if threshold is met', () => {
        const learnedSigns = new Set(['s1', 's2', 's3', 's4', 's5']);
        const newBadges = checkForNewBadges({
            learnedSigns,
            dailyStreak: 0,
            gameStars: 0,
            gameCompletions: {},
            earnedBadges: [],
        });
        expect(newBadges).toContain('b1');
    });

    it('does not grant badges if thresholds are not met', () => {
        const learnedSigns = new Set(['s1']);
        const newBadges = checkForNewBadges({
            learnedSigns,
            dailyStreak: 2,
            gameStars: 5,
            gameCompletions: {},
            earnedBadges: [],
        });
        expect(newBadges).not.toContain('b1');
        expect(newBadges).not.toContain('b2');
        expect(newBadges).not.toContain('b3');
    });

    it('grants multiple valid badges simultaneously and ignores already earned', () => {
        const learnedSigns = new Set(['s1', 's2', 's3', 's4', 's5']); // met b1
        const newBadges = checkForNewBadges({
            learnedSigns,
            dailyStreak: 5, // met b2
            gameStars: 12, // met b3
            gameCompletions: {},
            earnedBadges: ['b1'], // b1 is already earned
        });

        expect(newBadges).toContain('b1'); // Result includes previously earned
        expect(newBadges).toContain('b2');
        expect(newBadges).toContain('b3');
    });
});
