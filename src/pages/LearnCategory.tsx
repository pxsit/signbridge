import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import SignCard from '../components/SignCard';
import SignDetailModal from '../components/SignDetailModal';
import type { Sign } from '@/types';

export default function LearnCategory() {
  const { category: categoryParam } = useParams();
  const category = decodeURIComponent(categoryParam ?? '');
  const { learnedSigns, toggleSignLearned, resetCategoryProgress } = useUser();
  const navigate = useNavigate();
  const categorySigns = useMemo(() => signs.filter((s) => s.category === category), [category]);
  const [selected, setSelected] = useState<Sign | null>(null);
  const [dismissedComplete, setDismissedComplete] = useState(false);
  const [hasBeenIncomplete, setHasBeenIncomplete] = useState(false);

  // Track if the category was already fully complete when this page mounted
  const [wasCompleteOnMount] = useState(() => {
    const initialLearnedCount = categorySigns.filter((s) => learnedSigns.has(s.id)).length;
    return initialLearnedCount === categorySigns.length;
  });

  const learnedCount = categorySigns.filter((s) => learnedSigns.has(s.id)).length;
  const complete = learnedCount === categorySigns.length;

  // When a category becomes incomplete, reset the session states so they can see the celebration if they complete it again.
  const [prevComplete, setPrevComplete] = useState(complete);
  if (complete !== prevComplete) {
    setPrevComplete(complete);
    if (!complete) {
      setHasBeenIncomplete(true);
      setDismissedComplete(false);
    }
  }

  const showCelebration =
    complete && !dismissedComplete && (!wasCompleteOnMount || hasBeenIncomplete);

  const handleRevise = () => {
    const confirmReset = window.confirm(
      `Are you sure you want to reset "${category}"?\nThis will reset your progress for this category so you can learn it again from scratch.`
    );
    if (confirmReset) {
      resetCategoryProgress(category);
    }
  };

  return (
    <div className="space-y-3">
      <button onClick={() => navigate('/learn')} className="font-bold">
        ← Back
      </button>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">{category}</h1>
          <p className="font-semibold text-slate-600">
            {learnedCount} of {categorySigns.length} signs done
          </p>
        </div>
        {complete && (
          <button
            onClick={handleRevise}
            className="flex items-center gap-1.5 self-start rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-extrabold text-amber-700 shadow-sm transition-all hover:bg-amber-100 active:scale-95"
          >
            🔄 Reset Progress
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {categorySigns.map((sign) => (
          <SignCard
            key={sign.id}
            sign={sign}
            learned={learnedSigns.has(sign.id)}
            onClick={() => setSelected(sign)}
          />
        ))}
      </div>
      {showCelebration && (
        <div className="bg-background fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="max-w-sm space-y-3 rounded-2xl bg-white p-6 text-center">
            <p className="text-4xl">🎉</p>
            <h2 className="text-2xl font-extrabold">Badge Awarded!</h2>
            <p>Mascot says: You completed {category}!</p>
            <button
              onClick={() => navigate('/learn')}
              className="bg-primary min-h-12 w-full rounded-xl px-4 py-3 font-bold text-white"
            >
              Continue to next category
            </button>
            <button
              onClick={() => navigate('/games')}
              className="min-h-12 w-full rounded-xl border px-4 py-3 font-bold"
            >
              Go to Games
            </button>
            <button
              onClick={() => setDismissedComplete(true)}
              className="min-h-12 w-full rounded-xl border border-slate-200 px-4 py-3 font-bold transition hover:bg-slate-50"
            >
              Review Signs
            </button>
          </div>
        </div>
      )}
      <SignDetailModal
        sign={selected}
        index={Math.max(
          0,
          categorySigns.findIndex((s) => s.id === selected?.id)
        )}
        total={categorySigns.length || 1}
        isLearned={selected ? learnedSigns.has(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleLearned={toggleSignLearned}
      />
    </div>
  );
}
