import { useMemo, useState } from 'react';
import { signs } from '../data/signs';
import GifPlaceholder from '../components/GifPlaceholder';
import { useUser } from '../context/UserContext';

const rounds = 8;
const pick = <T,>(arr: T[], n: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

export default function GameWordHunt() {
    const { addGameResult } = useUser();
    const deck = useMemo(() => pick(signs, rounds), []);
    const [idx, setIdx] = useState(0);
    const [score, setScore] = useState(0);
    const current = deck[idx];

    const options = useMemo(() => {
        if (!current) return [];
        const opts = pick(
            signs.filter((s) => s.id !== current.id),
            5
        );
        // eslint-disable-next-line react-hooks/purity
        opts.splice(Math.floor(Math.random() * 6), 0, current);
        return opts;
    }, [current]);

    if (!current) {
        const stars = score >= 6 ? 3 : score >= 4 ? 2 : 1;
        return (
            <div className="space-y-3">
                <h1 className="text-3xl font-extrabold">Results</h1>
                <p>
                    Score: {score}/{rounds}
                </p>
                <p>Stars earned: {'⭐'.repeat(stars)}</p>
                <button
                    onClick={() => addGameResult('word-hunt', stars)}
                    className="bg-primary text-white rounded-xl px-4 py-3 min-h-12"
                >
                    Save Result
                </button>
            </div>
        );
    }
    const answer = (id: number) => {
        if (id === current.id) setScore((s) => s + 1);
        setIdx((i) => i + 1);
    };
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-extrabold">
                Word Hunt {idx + 1}/{rounds}
            </h1>
            <p className="text-xl font-bold">Find: {current.word}</p>
            <div className="h-3 bg-slate-200 rounded-full">
                <div className="h-3 bg-primary rounded-full" style={{ width: `${100 - idx * 12.5}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                {options.map((o) => (
                    <button key={o.id} onClick={() => answer(o.id)} className="bg-white border rounded-xl p-2 min-h-12">
                        <GifPlaceholder word={o.word} size="sm" gifUrl={o.gifUrl} label={o.gifPlaceholderLabel} />
                    </button>
                ))}
            </div>
        </div>
    );
}
