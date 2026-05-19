import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import SignCard from '../components/SignCard';
import SignDetailModal from '../components/SignDetailModal';
import type { Sign } from '../types';

export default function LearnCategory() {
    const { category: categoryParam } = useParams();
    const category = decodeURIComponent(categoryParam ?? '');
    const { learnedSigns, learnSign } = useUser();
    const navigate = useNavigate();
    const categorySigns = useMemo(() => signs.filter((s) => s.category === category), [category]);
    const [selected, setSelected] = useState<Sign | null>(null);

    const learnedCount = categorySigns.filter((s) => learnedSigns.has(s.id)).length;
    const complete = learnedCount === categorySigns.length;

    return (
        <div className="space-y-3">
            <button onClick={() => navigate('/learn')} className="font-bold">
                ← Back
            </button>
            <h1 className="text-3xl font-extrabold">{category}</h1>
            <p className="font-semibold">
                {learnedCount} of {categorySigns.length} signs done
            </p>
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
            {complete && (
                <div className="fixed inset-0 bg-background z-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 text-center space-y-3 max-w-sm">
                        <p className="text-4xl">🎉</p>
                        <h2 className="text-2xl font-extrabold">Badge Awarded!</h2>
                        <p>Mascot says: You completed {category}!</p>
                        <button
                            onClick={() => navigate('/learn')}
                            className="bg-primary text-white rounded-xl min-h-12 px-4 py-3 w-full font-bold"
                        >
                            Continue to next category
                        </button>
                        <button
                            onClick={() => navigate('/games')}
                            className="border rounded-xl min-h-12 px-4 py-3 w-full font-bold"
                        >
                            Go to Games
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
                onLearn={learnSign}
            />
        </div>
    );
}
