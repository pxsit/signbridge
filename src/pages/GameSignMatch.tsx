import { useMemo, useState } from 'react';
import { signs } from '../data/signs';
import GifPlaceholder from '../components/GifPlaceholder';
import { useUser } from '../context/UserContext';

const rounds = 10;

const pick = <T,>(arr: T[], n: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

export default function GameSignMatch() {
  const { addGameResult } = useUser();
  const deck = useMemo(() => pick(signs, rounds), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const current = deck[idx];

  const options = useMemo(() => {
    if (!current) return [];
    const opts = pick(
      signs.filter((s) => s.id !== current.id),
      3
    ).map((s) => s.word);
    // eslint-disable-next-line react-hooks/purity
    opts.splice(Math.floor(Math.random() * 4), 0, current.word);
    return opts;
  }, [current]);

  if (!current) {
    const stars = score >= 8 ? 3 : score >= 5 ? 2 : 1;
    return (
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold">Results</h1>
        <p>
          Score: {score}/{rounds}
        </p>
        <p>Stars earned: {'⭐'.repeat(stars)}</p>
        <button
          onClick={() => addGameResult('sign-match', stars)}
          className="bg-primary min-h-12 rounded-xl px-4 py-3 text-white"
        >
          Save Result
        </button>
      </div>
    );
  }
  const answer = (word: string) => {
    if (word === current.word) {
      setScore((s) => s + 1);
      setFeedback('Great! ✅');
      setTimeout(() => {
        setIdx((i) => i + 1);
        setFeedback('');
      }, 500);
      return;
    }
    setFeedback('Try again ❌');
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">
        Sign Match {idx + 1}/{rounds}
      </h1>
      <GifPlaceholder
        word={current.word}
        size="md"
        gifUrl={current.gifUrl}
        label={current.gifPlaceholderLabel}
      />
      <div className="grid gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => answer(o)}
            className="min-h-12 rounded-xl border bg-white px-4 py-3 font-bold"
          >
            {o}
          </button>
        ))}
      </div>
      <p className="font-bold">{feedback}</p>
    </div>
  );
}
