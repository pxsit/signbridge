import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../utils/storage';
import { checkStreak, getTodayISO } from '../utils/streakUtils';
import { checkForNewBadges } from '../utils/badgeChecker';

const UserContext = createContext(null);

const initialState = {
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
    gameCompletions: {},
};

export const UserProvider = ({ children }) => {
    const [state, setState] = useState(() => {
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

    const learnSign = (sign, duration = 1) => {
        setState((prev) => {
            const nextLearned = new Set(prev.learnedSigns);
            nextLearned.add(sign.id);
            const next = {
                ...prev,
                learnedSigns: [...nextLearned],
                lastPracticeDate: getTodayISO(),
                sessionLog: [
                    {
                        date: new Date().toISOString(),
                        category: sign.category,
                        duration,
                        count: 1,
                    },
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

    const addGameResult = (gameId, stars, category = 'Games', duration = 2) => {
        setState((prev) => {
            const next = {
                ...prev,
                gameStars: prev.gameStars + stars,
                lastPracticeDate: getTodayISO(),
                gameCompletions: { ...prev.gameCompletions, [gameId]: true },
                sessionLog: [
                    {
                        date: new Date().toISOString(),
                        category,
                        duration,
                        count: 1,
                    },
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

    const updateProfile = ({ userName, userRole, onboardingDone }) => {
        setState((prev) => ({ ...prev, userName, userRole, onboardingDone }));
    };

    const toggleCaregiverMode = () => {
        setState((prev) => ({ ...prev, caregiverMode: !prev.caregiverMode }));
    };

    const value = useMemo(
        () => ({
            ...state,
            learnedSigns: new Set(state.learnedSigns),
            updateProfile,
            learnSign,
            addGameResult,
            markPracticedToday,
            toggleCaregiverMode,
            setState,
        }),
        [state]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
