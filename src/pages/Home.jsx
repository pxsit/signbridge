import { Link, useNavigate } from 'react-router-dom';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import GifPlaceholder from '../components/GifPlaceholder';
import CategoryCard from '../components/CategoryCard';
import Mascot from '../components/Mascot';
import StreakCard from '../components/StreakCard';

export default function Home() {
    const { userName, learnedSigns, dailyStreak, learnSign } = useUser();
    const navigate = useNavigate();
    const categories = [...new Set(signs.map((s) => s.category))];
    const signOfDay = signs[new Date().getDate() % signs.length];

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-extrabold">Hi {userName || 'Friend'}! Ready to sign today? 👋</h1>
                <Link to="/settings" aria-label="Open settings" className="text-2xl">
                    ⚙️
                </Link>
            </div>
            <StreakCard streak={dailyStreak} />
            <section className="bg-white rounded-2xl p-4 border border-slate-200">
                <p className="font-semibold">Daily Sign of the Day</p>
                <div className="flex flex-col items-center gap-2 mt-2">
                    <GifPlaceholder
                        word={signOfDay.word}
                        size="md"
                        gifUrl={signOfDay.gifUrl}
                        label={signOfDay.gifPlaceholderLabel}
                    />
                    <p className="text-2xl font-extrabold">{signOfDay.word}</p>
                    <button
                        onClick={() => learnSign(signOfDay)}
                        className="bg-primary text-white rounded-xl px-4 py-3 min-h-12 font-bold"
                    >
                        Mark as learned
                    </button>
                </div>
            </section>
            <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                    <CategoryCard
                        key={c}
                        icon="🧩"
                        title={c}
                        subtitle={`${signs.filter((s) => s.category === c && learnedSigns.has(s.id)).length}/8 learned`}
                        onClick={() => navigate(`/learn/${encodeURIComponent(c)}`)}
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
