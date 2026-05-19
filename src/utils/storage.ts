import type { UserState } from '../types';

const STORAGE_KEY = 'signbridge_user_state';

export const loadState = (): UserState | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const saveState = (state: UserState) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore localStorage write errors
    }
};
