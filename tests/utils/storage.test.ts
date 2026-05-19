import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState } from '../../src/utils/storage';
import type { UserState } from '../../src/types';

const STORAGE_KEY = 'signbridge_user_state';

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storage utility', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('loadState returns null if storage is empty', () => {
    expect(loadState()).toBeNull();
  });

  it('loadState returns parsed state if available', () => {
    const mockState: Partial<UserState> = { userName: 'Alice', dailyStreak: 5 };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockState));

    const state = loadState();
    expect(state?.userName).toBe('Alice');
    expect(state?.dailyStreak).toBe(5);
  });

  it('loadState returns null if JSON is invalid', () => {
    window.localStorage.setItem(STORAGE_KEY, 'invalid-json');
    expect(loadState()).toBeNull();
  });

  it('saveState writes purely stringified state to localStorage', () => {
    const mockState = { userName: 'Bob', dailyStreak: 10 } as UserState;
    saveState(mockState);

    const raw = window.localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeDefined();

    const parsed = JSON.parse(raw!);
    expect(parsed.userName).toBe('Bob');
    expect(parsed.dailyStreak).toBe(10);
  });
});
