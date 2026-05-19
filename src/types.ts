export interface Sign {
    id: number;
    word: string;
    category: string;
    gifUrl: string | null;
    gifPlaceholderLabel: string;
    exampleSentence: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced' | string;
    tags: string[];
}

export type BadgeConditionType =
    | 'signs_learned'
    | 'categories_completed'
    | 'streak'
    | 'stars'
    | 'games_completed'
    | 'category_complete';

export interface BadgeCondition {
    type: BadgeConditionType;
    value: number | string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: BadgeCondition;
}

export interface StoryQuestion {
    q: string;
    choices: string[];
    answer: string;
}

export interface Story {
    id: string;
    title: string;
    lines: string[];
    highlightedWords: string[];
    questions: StoryQuestion[];
}

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
