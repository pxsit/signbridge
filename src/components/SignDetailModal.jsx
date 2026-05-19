import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GifPlaceholder from './GifPlaceholder';

export default function SignDetailModal({ sign, index, total, isLearned, onClose, onLearn }) {
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
        <div className="fixed inset-0 z-50 bg-background p-4 overflow-auto">
            <div className="max-w-xl mx-auto space-y-4">
                <p className="font-semibold">
                    Session progress: {index + 1} of {total}
                </p>
                <div className="h-3 bg-slate-200 rounded-full">
                    <div className="h-3 bg-primary rounded-full" style={{ width: `${((index + 1) / total) * 100}%` }} />
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
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    {sign.category}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                        onClick={handleLearn}
                        className="bg-primary text-white rounded-xl px-4 py-3 min-h-12 font-bold"
                    >
                        Got it! ✓
                    </button>
                    <button
                        onClick={() => setReplayKey((k) => k + 1)}
                        className="bg-white border border-slate-300 rounded-xl px-4 py-3 min-h-12 font-bold"
                    >
                        Repeat
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-white border border-slate-300 rounded-xl px-4 py-3 min-h-12 font-bold"
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
