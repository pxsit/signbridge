import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/data/badges', () => ({
  badges: [
    { id: 'b1', condition: { type: 'signs_learned', value: 5 } },
    { id: 'b2', condition: { type: 'streak', value: 3 } },
    { id: 'b3', condition: { type: 'stars', value: 10 } },
  ],
}));

vi.mock('../../src/data/signs', () => ({
  signs: [
    { id: 1, category: 'basics' },
    { id: 2, category: 'basics' },
  ],
}));

import { checkForNewBadges } from '../../src/utils/badgeChecker';

describe('badgeChecker', () => {
  it('grants signs_learned badge if threshold is met', () => {
    const learnedSigns = new Set([1, 2, 3, 4, 5]);
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
    const learnedSigns = new Set([1]);
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
    const learnedSigns = new Set([1, 2, 3, 4, 5]);
    const newBadges = checkForNewBadges({
      learnedSigns,
      dailyStreak: 5,
      gameStars: 12,
      gameCompletions: {},
      earnedBadges: ['b1'],
    });

    expect(newBadges).toContain('b1');
    expect(newBadges).toContain('b2');
    expect(newBadges).toContain('b3');
  });
});
