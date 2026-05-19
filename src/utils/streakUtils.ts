const toDateOnly = (date: Date | string) => new Date(date).toISOString().slice(0, 10);

export const getTodayISO = () => toDateOnly(new Date());

export const checkStreak = (dailyStreak: number, lastPracticeDate: string | null) => {
    if (!lastPracticeDate) return dailyStreak;
    const today = new Date(getTodayISO());
    const last = new Date(lastPracticeDate);
    const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) return dailyStreak + 1;
    if (diff > 1) return 0;
    return dailyStreak;
};
