import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkStreak, getTodayISO } from './streakUtils';

describe('streakUtils', () => {
    describe('checkStreak', () => {
        beforeEach(() => {
            // Mock system time so "today" is highly predictable
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2026-05-19T10:00:00Z'));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('returns same streak if lastPracticeDate is null', () => {
            expect(checkStreak(5, null)).toBe(5);
        });

        it('maintains the streak if practiced today', () => {
            expect(checkStreak(5, '2026-05-19')).toBe(5);
        });

        it('increments the streak if practiced exactly yesterday', () => {
            expect(checkStreak(5, '2026-05-18')).toBe(6);
        });

        it('breaks the streak down to 0 if missed a day or more', () => {
            expect(checkStreak(5, '2026-05-17')).toBe(0);
        });
    });

    describe('getTodayISO', () => {
        it('returns correctly formatted date string', () => {
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2026-05-19T10:00:00Z'));
            expect(getTodayISO()).toBe('2026-05-19');
            vi.useRealTimers();
        });
    });
});