export interface SessionLogItem {
  date: string;
  category: string;
  duration: number;
  count: number;
}

export interface UserState {
  userName: string;
  userRole: string;
  learnedSigns: number[];
  dailyStreak: number;
  lastPracticeDate: string;
  earnedBadges: string[];
  gameStars: number;
  sessionLog: SessionLogItem[];
  onboardingDone: boolean;
  caregiverMode: boolean;
  gameCompletions: Record<string, boolean>;
}
