import { describe, it, expect } from 'vitest';
import { avatars } from '../../src/data/avatars';
import { getUnlockedAvatarIds, isAvatarUnlocked } from '../../src/utils/avatarUnlocks';

describe('avatarUnlocks', () => {
  it('unlocks the default avatar immediately', () => {
    const sprout = avatars.find((a) => a.id === 'sprout');
    expect(sprout).toBeTruthy();
    expect(
      isAvatarUnlocked(sprout!, {
        learnedSignsCount: 0,
        dailyStreak: 0,
        gameStars: 0,
      })
    ).toBe(true);
  });

  it('unlocks milestone avatars only when requirements are met', () => {
    const dragon = avatars.find((a) => a.id === 'dragon');
    expect(dragon).toBeTruthy();

    expect(
      isAvatarUnlocked(dragon!, {
        learnedSignsCount: 30,
        dailyStreak: 6,
        gameStars: 30,
      })
    ).toBe(false);

    expect(
      isAvatarUnlocked(dragon!, {
        learnedSignsCount: 30,
        dailyStreak: 7,
        gameStars: 30,
      })
    ).toBe(true);
  });

  it('returns all unlocked avatar ids for user progress', () => {
    const unlocked = getUnlockedAvatarIds({
      learnedSigns: Array.from({ length: 12 }, (_, index) => index + 1),
      dailyStreak: 4,
      gameStars: 20,
    });

    expect(unlocked).toContain('sprout');
    expect(unlocked).toContain('fox');
    expect(unlocked).toContain('panda');
    expect(unlocked).toContain('owl');
    expect(unlocked).not.toContain('dragon');
  });
});
