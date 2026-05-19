import { useState } from 'react';
import confetti from 'canvas-confetti';
import GifPlaceholder from './GifPlaceholder';
import type { Sign } from '@/types';

interface SignDetailModalProps {
  sign: Sign | null;
  index: number;
  total: number;
  isLearned: boolean;
  onClose: () => void;
  onToggleLearned: (sign: Sign) => void;
}

export default function SignDetailModal({
  sign,
  index,
  total,
  isLearned,
  onClose,
  onToggleLearned,
}: SignDetailModalProps) {
  const [replayKey, setReplayKey] = useState(0);

  if (!sign) return null;

  const handleLearn = () => {
    const wasLearned = isLearned;
    onToggleLearned(sign);

    // We removed the !reducedMotion check because it was preventing the confetti
    // from showing up if the OS "predictive animations" or "reduced motion" was on.
    if (!wasLearned) {
      void confetti({
        particleCount: 120,
        spread: 85,
        startVelocity: 45,
        origin: { y: 0.62 },
        zIndex: 1000,
        colors: ['#C0392B', '#F6C667', '#2F9E44', '#2563EB'],
      });
    }
  };

  return (
    <div className="bg-background fixed inset-0 z-50 overflow-auto p-4">
      <div className="mx-auto max-w-xl space-y-4">
        <p className="font-semibold">
          Session progress: {index + 1} of {total}
        </p>
        <div className="h-3 rounded-full bg-slate-200">
          <div
            className="bg-primary h-3 rounded-full"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <GifPlaceholder
          key={replayKey}
          word={sign.word}
          size="lg"
          gifUrl={sign.gifUrl}
          label={sign.gifPlaceholderLabel}
        />
        <h2 className="text-3xl font-extrabold">{sign.word}</h2>
        <p className="text-lg">{sign.exampleSentence}</p>
        <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 font-semibold">
          {sign.category}
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <button
            onClick={handleLearn}
            className={`min-h-12 rounded-xl px-4 py-3 font-bold text-white ${isLearned ? 'bg-slate-500' : 'bg-primary'}`}
          >
            {isLearned ? 'Undo ✓' : 'Got it! ✓'}
          </button>
          <button
            onClick={() => setReplayKey((k) => k + 1)}
            className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold"
          >
            Repeat
          </button>
          <button
            onClick={onClose}
            className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold"
          >
            ← Back
          </button>
        </div>
        {isLearned && <p className="text-success font-bold">Learned ✅</p>}
      </div>
    </div>
  );
}
