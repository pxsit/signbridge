import { avatars } from '@/data/avatars';
import type { UserState, Avatar } from '@/types';

interface ProgressStats {
  learnedSignsCount: number;
  dailyStreak: number;
  gameStars: number;
}

export function isAvatarUnlocked(avatar: Avatar, progress: ProgressStats): boolean {
  if (avatar.minLearnedSigns && progress.learnedSignsCount < avatar.minLearnedSigns) return false;
  if (avatar.minDailyStreak && progress.dailyStreak < avatar.minDailyStreak) return false;
  if (avatar.minGameStars && progress.gameStars < avatar.minGameStars) return false;
  return true;
}

export function getUnlockedAvatarIds(
  user: Pick<UserState, 'learnedSigns' | 'dailyStreak' | 'gameStars'>
): string[] {
  return avatars
    .filter((avatar) =>
      isAvatarUnlocked(avatar, {
        learnedSignsCount: user.learnedSigns.length,
        dailyStreak: user.dailyStreak,
        gameStars: user.gameStars,
      })
    )
    .map((avatar) => avatar.id);
}
