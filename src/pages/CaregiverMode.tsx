import { useMemo, useState } from 'react';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import GifPlaceholder from '../components/GifPlaceholder';

export default function CaregiverMode() {
    const { learnedSigns, sessionLog } = useUser();
    const learned = useMemo(() => signs.filter((s) => learnedSigns.has(s.id)), [learnedSigns]);
    const [index, setIndex] = useState(0);
    const current = learned[index];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-extrabold">Parent / Caregiver Mode</h1>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Cheat sheet</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {learned.map((s) => (
                        <div key={s.id} className="border rounded-xl p-2">
                            <GifPlaceholder word={s.word} size="sm" gifUrl={s.gifUrl} />
                            <p className="font-bold">{s.word}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Practice Together</h2>
                {current ? (
                    <div className="space-y-2">
                        <GifPlaceholder word={current.word} size="lg" gifUrl={current.gifUrl} />
                        <p className="text-2xl font-bold">{current.word}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                                className="border rounded-xl min-h-12"
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => setIndex((i) => Math.min(learned.length - 1, i + 1))}
                                className="border rounded-xl min-h-12"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Learn a sign to begin.</p>
                )}
            </section>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Awareness</h2>
                <div className="space-y-2">
                    <div className="bg-background rounded-xl p-3">
                        How hearing loss affects communication: listening effort can be high, so visual supports matter.
                    </div>
                    <div className="bg-background rounded-xl p-3">
                        Tips: face the child, use gestures, pause, and confirm understanding.
                    </div>
                    <div className="bg-background rounded-xl p-3">
                        SgSL matters because it gives children a full language bridge at home and school.
                    </div>
                </div>
            </section>
            <section className="bg-white rounded-2xl p-4 border">
                <h2 className="text-xl font-bold">Session log</h2>
                {sessionLog.slice(0, 10).map((s, i) => (
                    <p key={i} className="text-sm">
                        {new Date(s.date).toLocaleString()} - {s.category} ({s.duration} min)
                    </p>
                ))}
            </section>
        </div>
    );
}
