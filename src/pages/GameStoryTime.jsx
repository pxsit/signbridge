import { useState } from 'react';
import { stories } from '../data/stories';
import { signs } from '../data/signs';
import GifPlaceholder from '../components/GifPlaceholder';
import { useUser } from '../context/UserContext';

export default function GameStoryTime() {
    const { addGameResult } = useUser();
    const [story] = useState(() => stories[Math.floor(Math.random() * stories.length)]);
    const [line, setLine] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [done, setDone] = useState(false);

    if (done) {
        const stars = correct === 2 ? 3 : correct === 1 ? 2 : 1;
        return (
            <div className="space-y-3">
                <h1 className="text-3xl font-extrabold">Story Summary</h1>
                <p>Correct answers: {correct}/2</p>
                <p>Signs used:</p>
                <div className="flex flex-wrap gap-2">
                    {story.highlightedWords.map((w) => (
                        <span key={w} className="bg-white border rounded-full px-3 py-1">
                            {w}
                        </span>
                    ))}
                </div>
                <button
                    onClick={() => addGameResult('story-time', stars)}
                    className="bg-primary text-white rounded-xl px-4 py-3 min-h-12"
                >
                    Save Result ({'⭐'.repeat(stars)})
                </button>
            </div>
        );
    }

    if (line < story.lines.length) {
        const words = story.highlightedWords.filter((w) => story.lines[line].toLowerCase().includes(w.toLowerCase()));
        return (
            <div className="space-y-3">
                <h1 className="text-2xl font-extrabold">{story.title}</h1>
                <p className="text-xl font-bold">{story.lines[line]}</p>
                <div className="grid gap-2">
                    {words.map((w) => {
                        const sign = signs.find((s) => s.word.toLowerCase() === w.toLowerCase());
                        return sign ? <GifPlaceholder key={w} word={w} size="sm" gifUrl={sign.gifUrl} /> : null;
                    })}
                </div>
                <button
                    onClick={() => setLine((l) => l + 1)}
                    className="bg-primary text-white rounded-xl px-4 py-3 min-h-12"
                >
                    Next
                </button>
            </div>
        );
    }

    const q = story.questions[qIndex];
    const answer = (choice) => {
        if (choice === q.answer) setCorrect((c) => c + 1);
        if (qIndex === story.questions.length - 1) setDone(true);
        else setQIndex((i) => i + 1);
    };
    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-extrabold">Question {qIndex + 1}</h2>
            <p className="text-lg font-bold">{q.q}</p>
            <div className="grid gap-2">
                {q.choices.map((c) => (
                    <button key={c} onClick={() => answer(c)} className="bg-white border rounded-xl px-4 py-3 min-h-12">
                        {c}
                    </button>
                ))}
            </div>
        </div>
    );
}
