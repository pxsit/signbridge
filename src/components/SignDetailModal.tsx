import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GifPlaceholder from './GifPlaceholder';
import type { Sign } from '@/types';

interface SignDetailModalProps {
  sign: Sign | null;
  index: number;
  total: number;
  isLearned: boolean;
  onClose: () => void;
  onLearn: (sign: Sign) => void;
}

export default function SignDetailModal({
  sign,
  index,
  total,
  isLearned,
  onClose,
  onLearn,
}: SignDetailModalProps) {
  const [replayKey, setReplayKey] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const reducedMotion = useReducedMotion();

  if (!sign) return null;

  const handleLearn = () => {
    onLearn(sign);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 900);
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
            className="bg-primary min-h-12 rounded-xl px-4 py-3 font-bold text-white"
          >
            Got it! ✓
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
        {isLearned && <p className="text-success font-bold">Already learned ✅</p>}
        <AnimatePresence>
          {celebrate && (
            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-2xl font-extrabold text-amber-600"
            >
              🎉 Confetti moment!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
