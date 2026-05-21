import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { loadState, saveState } from '@/utils/storage';
import { checkStreak, getTodayISO } from '@/utils/streakUtils';
import { checkForNewBadges } from '@/utils/badgeChecker';
import { getUnlockedAvatarIds } from '@/utils/avatarUnlocks';
import { signs } from '@/data/signs';
import type { Sign, UserState } from '@/types';

interface UpdateProfileInput {
  userName: string;
  userRole: string;
  onboardingDone: boolean;
}

interface UserContextValue extends Omit<UserState, 'learnedSigns'> {
  learnedSigns: Set<number>;
  updateProfile: (input: UpdateProfileInput) => void;
  learnSign: (sign: Sign, duration?: number) => void;
  toggleSignLearned: (sign: Sign, duration?: number) => void;
  addGameResult: (gameId: string, stars: number, category?: string, duration?: number) => void;
  markPracticedToday: () => void;
  enableCaregiverMode: (password: string) => boolean;
  disableCaregiverMode: () => void;
  unlockCaregiver: (password: string) => boolean;
  setAvatar: (avatarId: string) => void;
  resetCategoryProgress: (categoryName: string) => void;
  setState: React.Dispatch<React.SetStateAction<UserState>>;
}

const initialState: UserState = {
  userName: '',
  userRole: '',
  learnedSigns: [],
  dailyStreak: 0,
  lastPracticeDate: '',
  earnedBadges: [],
  gameStars: 0,
  sessionLog: [],
  onboardingDone: false,
  caregiverMode: false,
  caregiverUnlocked: false,
  gameCompletions: {},
  avatarId: 'sprout',
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UserState>(() => {
    const saved = loadState();
    if (!saved) return initialState;
    const loadedState = { ...initialState, ...saved };
    const newStreak = checkStreak(loadedState.dailyStreak, loadedState.lastPracticeDate);
    return { ...loadedState, dailyStreak: newStreak };
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const markPracticedToday = () => {
    const today = getTodayISO();
    setState((prev) => ({ ...prev, lastPracticeDate: today }));
  };

  const learnSign = (sign: Sign, duration = 1) => {
    setState((prev) => {
      const nextLearned = new Set(prev.learnedSigns);
      if (nextLearned.has(sign.id)) return prev;

      nextLearned.add(sign.id);
      const next: UserState = {
        ...prev,
        learnedSigns: [...nextLearned],
        lastPracticeDate: getTodayISO(),
        sessionLog: [
          { date: new Date().toISOString(), category: sign.category, duration, count: 1 },
          ...prev.sessionLog,
        ].slice(0, 100),
      };

      next.earnedBadges = checkForNewBadges({
        learnedSigns: nextLearned,
        dailyStreak: next.dailyStreak,
        gameStars: next.gameStars,
        gameCompletions: next.gameCompletions,
        earnedBadges: next.earnedBadges,
      });
      return next;
    });
  };

  const toggleSignLearned = (sign: Sign, duration = 1) => {
    setState((prev) => {
      const nextLearned = new Set(prev.learnedSigns);
      const hadSign = nextLearned.has(sign.id);
      if (hadSign) {
        nextLearned.delete(sign.id);
      } else {
        nextLearned.add(sign.id);
      }

      const next: UserState = {
        ...prev,
        learnedSigns: [...nextLearned],
        lastPracticeDate: getTodayISO(),
        sessionLog: hadSign
          ? prev.sessionLog
          : [
              { date: new Date().toISOString(), category: sign.category, duration, count: 1 },
              ...prev.sessionLog,
            ].slice(0, 100),
      };

      next.earnedBadges = checkForNewBadges({
        learnedSigns: nextLearned,
        dailyStreak: next.dailyStreak,
        gameStars: next.gameStars,
        gameCompletions: next.gameCompletions,
        earnedBadges: next.earnedBadges,
      });
      return next;
    });
  };

  const addGameResult = (gameId: string, stars: number, category = 'Games', duration = 2) => {
    setState((prev) => {
      const next: UserState = {
        ...prev,
        gameStars: prev.gameStars + stars,
        lastPracticeDate: getTodayISO(),
        gameCompletions: { ...prev.gameCompletions, [gameId]: true },
        sessionLog: [
          { date: new Date().toISOString(), category, duration, count: 1 },
          ...prev.sessionLog,
        ].slice(0, 100),
      };
      next.earnedBadges = checkForNewBadges({
        learnedSigns: new Set(next.learnedSigns),
        dailyStreak: next.dailyStreak,
        gameStars: next.gameStars,
        gameCompletions: next.gameCompletions,
        earnedBadges: next.earnedBadges,
      });
      return next;
    });
  };

  const updateProfile = ({ userName, userRole, onboardingDone }: UpdateProfileInput) => {
    setState((prev) => ({ ...prev, userName, userRole, onboardingDone }));
  };

  const enableCaregiverMode = (password: string) => {
    if (password !== 'caregiver') return false;
    setState((prev) => ({ ...prev, caregiverMode: true, caregiverUnlocked: true }));
    return true;
  };

  const disableCaregiverMode = () => {
    setState((prev) => ({ ...prev, caregiverMode: false, caregiverUnlocked: false }));
  };

  const unlockCaregiver = (password: string) => {
    if (password !== 'caregiver') return false;
    setState((prev) => ({ ...prev, caregiverUnlocked: true }));
    return true;
  };

  const setAvatar = (avatarId: string) => {
    setState((prev) => {
      const unlocked = getUnlockedAvatarIds(prev);
      if (!unlocked.includes(avatarId)) return prev;
      return { ...prev, avatarId };
    });
  };

  const resetCategoryProgress = (categoryName: string) => {
    setState((prev) => {
      const categorySignIds = new Set(
        signs.filter((s) => s.category === categoryName).map((s) => s.id)
      );
      const nextLearned = prev.learnedSigns.filter((id) => !categorySignIds.has(id));
      return {
        ...prev,
        learnedSigns: nextLearned,
      };
    });
  };

  const value = useMemo<UserContextValue>(
    () => ({
      ...state,
      learnedSigns: new Set(state.learnedSigns),
      updateProfile,
      learnSign,
      toggleSignLearned,
      addGameResult,
      markPracticedToday,
      enableCaregiverMode,
      disableCaregiverMode,
      unlockCaregiver,
      setAvatar,
      resetCategoryProgress,
      setState,
    }),
    [state]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextValue => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
};
