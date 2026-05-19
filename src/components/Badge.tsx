import type { Badge as BadgeType } from '@/types';

interface BadgeProps {
  badge: BadgeType;
  earned: boolean;
}

export default function Badge({ badge, earned }: BadgeProps) {
  return (
    <div
      className={`rounded-2xl border p-3 text-center ${earned ? 'bg-amberSoft/30 border-amberSoft' : 'border-slate-300 bg-slate-100 opacity-70'}`}
    >
      <div className="text-2xl" aria-hidden="true">
        {earned ? badge.icon : '🔒'}
      </div>
      <p className="text-sm font-bold">{badge.name}</p>
    </div>
  );
}
