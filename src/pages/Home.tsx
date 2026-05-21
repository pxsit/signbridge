import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signs } from '@/data/signs';
import { useUser } from '@/context/UserContext';
import GifPlaceholder from '@/components/GifPlaceholder';
import CategoryCard from '@/components/CategoryCard';
import Mascot from '@/components/Mascot';
import StreakCard from '@/components/StreakCard';

export default function Home() {
  const { userName, learnedSigns, dailyStreak, learnSign } = useUser();
  const navigate = useNavigate();

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; learned: number }> = {};
    signs.forEach((s) => {
      if (!stats[s.category]) stats[s.category] = { total: 0, learned: 0 };
      stats[s.category].total += 1;
      if (learnedSigns.has(s.id)) stats[s.category].learned += 1;
    });

    const sortedCategories = Object.keys(stats).sort((a, b) => {
      if (a === 'Basics') return -1;
      if (b === 'Basics') return 1;
      return a.localeCompare(b);
    });

    return sortedCategories.map((c) => ({
      name: c,
      ...stats[c],
    }));
  }, [learnedSigns]);

  const signOfDay = signs[new Date().getDate() % signs.length];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-extrabold">
          Hi {userName || 'Friend'}! Ready to sign today? 👋
        </h1>
        <Link to="/settings" aria-label="Open settings" className="text-2xl">
          ⚙️
        </Link>
      </div>
      <StreakCard streak={dailyStreak} />
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="font-semibold">Daily Sign of the Day</p>
        <div className="mt-2 flex flex-col items-center gap-2">
          <GifPlaceholder
            word={signOfDay.word}
            size="md"
            gifUrl={signOfDay.gifUrl}
            label={signOfDay.gifPlaceholderLabel}
          />
          <p className="text-2xl font-extrabold">{signOfDay.word}</p>
          {learnedSigns.has(signOfDay.id) ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-green-500 px-4 py-3 font-bold text-white shadow-sm"
            >
              Learned! ✓
            </motion.div>
          ) : (
            <button
              onClick={() => learnSign(signOfDay)}
              className="bg-primary min-h-12 w-full rounded-xl px-4 py-3 font-bold text-white transition-transform active:scale-95"
            >
              Mark as learned
            </button>
          )}
        </div>
      </section>
      <div className="grid grid-cols-2 gap-2">
        {categoryStats.map((c) => (
          <CategoryCard
            key={c.name}
            icon="🧩"
            title={c.name}
            subtitle={`${c.learned}/${c.total} learned`}
            onClick={() => navigate(`/learn/${encodeURIComponent(c.name)}`)}
          />
        ))}
      </div>
      <div className="bg-amberSoft/30 rounded-xl p-3 font-semibold">
        Did you know? Pointing is natural in sign language!
      </div>
      <Mascot message="Small practice every day makes a big difference." />
    </div>
  );
}
