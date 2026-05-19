import type { Badge } from '@/types';

export const badges: Badge[] = [
  {
    id: 'first_sign',
    name: 'First Sign',
    description: 'Learned your very first sign!',
    icon: '🌱',
    condition: { type: 'signs_learned', value: 1 },
  },
  {
    id: 'getting_started',
    name: 'Getting Started',
    description: 'Completed your first category!',
    icon: '🚀',
    condition: { type: 'categories_completed', value: 1 },
  },
  {
    id: 'streak_7',
    name: '7-Day Streak',
    description: 'Practiced 7 days in a row!',
    icon: '🔥',
    condition: { type: 'streak', value: 7 },
  },
  {
    id: 'emotion_expert',
    name: 'Emotion Expert',
    description: 'Completed Emotions category.',
    icon: '😊',
    condition: { type: 'category_complete', value: 'Emotions' },
  },
  {
    id: 'family_champion',
    name: 'Family Champion',
    description: 'Completed Family & People category.',
    icon: '👨‍👩‍👧',
    condition: { type: 'category_complete', value: 'Family & People' },
  },
  {
    id: 'game_on',
    name: 'Game On',
    description: 'Completed all 3 games once.',
    icon: '🎮',
    condition: { type: 'games_completed', value: 3 },
  },
  {
    id: 'star_collector',
    name: 'Star Collector',
    description: 'Earned 30 stars total.',
    icon: '⭐',
    condition: { type: 'stars', value: 30 },
  },
  {
    id: 'signbridge_hero',
    name: 'SignBridge Hero',
    description: 'Learned all 40 signs.',
    icon: '🏆',
    condition: { type: 'signs_learned', value: 40 },
  },
];
