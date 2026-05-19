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
        <div className="rounded-xl border bg-white p-3">
          <p>🔥</p>
          <p>{dailyStreak}</p>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <p>✅</p>
          <p>{learnedSigns.size}</p>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <p>⭐</p>
          <p>{gameStars}</p>
        </div>
      </div>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Category completion</h2>
        <div className="mt-2 space-y-2">
          {categories.map((c) => {
            const total = signs.filter((s) => s.category === c).length;
            const current = signs.filter((s) => s.category === c && learnedSigns.has(s.id)).length;
            return <ProgressBar key={c} current={current} total={total} label={c} />;
          })}
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Badges</h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {badges.map((b) => (
            <Badge key={b.id} badge={b} earned={earnedBadges.includes(b.id)} />
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Session log</h2>
        <div className="mt-2 space-y-2">
          {sessionLog.slice(0, 7).map((s, i) => (
            <div key={`${s.date}-${i}`} className="border-b pb-1 text-sm">
              {new Date(s.date).toLocaleDateString()} - {s.category} - {s.count} signs -{' '}
              {s.duration} min
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
