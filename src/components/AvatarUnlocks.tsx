import { avatars } from '@/data/avatars';
import { isAvatarUnlocked } from '@/utils/avatarUnlocks';

interface AvatarUnlocksProps {
  learnedSignsCount: number;
  dailyStreak: number;
  gameStars: number;
  selectedAvatarId: string;
  onSelectAvatar: (avatarId: string) => void;
}

export default function AvatarUnlocks({
  learnedSignsCount,
  dailyStreak,
  gameStars,
  selectedAvatarId,
  onSelectAvatar,
}: AvatarUnlocksProps) {
  return (
    <section className="rounded-2xl border bg-white p-4">
      <h2 className="text-xl font-bold">Avatar unlocks</h2>
      <p className="mt-1 text-sm text-slate-600">
        Unlock and equip avatars as you level up your progress.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {avatars.map((avatar) => {
          const unlocked = isAvatarUnlocked(avatar, {
            learnedSignsCount,
            dailyStreak,
            gameStars,
          });
          const selected = selectedAvatarId === avatar.id;

          return (
            <button
              type="button"
              key={avatar.id}
              disabled={!unlocked}
              onClick={() => onSelectAvatar(avatar.id)}
              className={`rounded-xl border p-3 text-left transition ${
                unlocked ? 'hover:border-success cursor-pointer' : 'cursor-not-allowed opacity-60'
              } ${selected ? 'border-success ring-success/30 ring-2' : 'border-slate-200'}`}
            >
              <div className="text-3xl">{avatar.emoji}</div>
              <p className="mt-1 text-sm font-semibold">{avatar.name}</p>
              <p className="text-xs text-slate-600">{unlocked ? 'Unlocked' : avatar.unlockLabel}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
