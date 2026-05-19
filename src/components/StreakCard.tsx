interface StreakCardProps {
    streak: number;
}

export default function StreakCard({ streak }: StreakCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-red-200 p-4">
            <p className="text-sm font-semibold">Streak</p>
            <p className="text-2xl font-extrabold text-primary">🔥 {streak}-day streak! Keep it up!</p>
        </div>
    );
}
