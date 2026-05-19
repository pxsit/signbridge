import type { Avatar } from '@/types';

export const avatars: Avatar[] = [
  {
    id: 'sprout',
    name: 'Sprout',
    emoji: '🌱',
    unlockLabel: 'Default',
  },
  {
    id: 'fox',
    name: 'Swift Fox',
    emoji: '🦊',
    unlockLabel: 'Learn 10 signs',
    minLearnedSigns: 10,
  },
  {
    id: 'panda',
    name: 'Focused Panda',
    emoji: '🐼',
    unlockLabel: 'Reach a 3-day streak',
    minDailyStreak: 3,
  },
  {
    id: 'owl',
    name: 'Wise Owl',
    emoji: '🦉',
    unlockLabel: 'Earn 15 stars',
    minGameStars: 15,
  },
  {
    id: 'dragon',
    name: 'Master Dragon',
    emoji: '🐉',
    unlockLabel: 'Learn 30 signs, 7-day streak, and 30 stars',
    minLearnedSigns: 30,
    minDailyStreak: 7,
    minGameStars: 30,
  },
];
