interface StreakCardProps {
  streak: number;
}

export default function StreakCard({ streak }: StreakCardProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-4">
      <p className="text-sm font-semibold">Streak</p>
      <p className="text-primary text-2xl font-extrabold">🔥 {streak}-day streak! Keep it up!</p>
    </div>
  );
}
