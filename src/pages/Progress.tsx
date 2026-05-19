import { signs } from '../data/signs';
import { badges } from '../data/badges';
import { useUser } from '../context/UserContext';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

export default function Progress() {
    const { dailyStreak, learnedSigns, gameStars, earnedBadges, sessionLog } = useUser();
    const categories = [...new Set(signs.map((s) => s.category))];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-extrabold">Progress Tracker</h1>
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-xl p-3 border">
                    <p>🔥</p>
                    <p>{dailyStreak}</p>
                </div>
                <div className="bg-white rounded-xl p-3 border">
                    <p>✅</p>
                    <p>{learnedSigns.size}</p>
                </div>
                <div className="bg-white rounded-xl p-3 border">
                    <p>⭐</p>
                    <p>{gameStars}</p>
                </div>
            </div>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Category completion</h2>
                <div className="space-y-2 mt-2">
                    {categories.map((c) => {
                        const total = signs.filter((s) => s.category === c).length;
                        const current = signs.filter((s) => s.category === c && learnedSigns.has(s.id)).length;
                        return <ProgressBar key={c} current={current} total={total} label={c} />;
                    })}
                </div>
            </section>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Badges</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {badges.map((b) => (
                        <Badge key={b.id} badge={b} earned={earnedBadges.includes(b.id)} />
                    ))}
                </div>
            </section>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Session log</h2>
                <div className="space-y-2 mt-2">
                    {sessionLog.slice(0, 7).map((s, i) => (
                        <div key={`${s.date}-${i}`} className="text-sm border-b pb-1">
                            {new Date(s.date).toLocaleDateString()} - {s.category} - {s.count} signs - {s.duration} min
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
