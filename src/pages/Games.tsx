import { useNavigate } from 'react-router-dom';

export default function Games() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-extrabold">Games</h1>

      <button
        onClick={() => navigate('/games/sign-match')}
        className="hover:border-primary min-h-12 w-full rounded-2xl border bg-white p-4 text-left transition-colors"
      >
        <p className="text-xl font-bold">Sign Match</p>
        <p className="text-slate-600">Classic quiz: Match the GIF sign to the right word.</p>
      </button>

      <button
        onClick={() => navigate('/games/memory-match')}
        className="hover:border-primary min-h-12 w-full rounded-2xl border bg-white p-4 text-left transition-colors"
      >
        <p className="text-xl font-bold">Memory Match 🧠</p>
        <p className="text-slate-600">
          Train your brain by finding pairs of words and their corresponding signs.
        </p>
      </button>

      <button
        onClick={() => navigate('/games/story-time')}
        className="hover:border-primary min-h-12 w-full rounded-2xl border bg-white p-4 text-left transition-colors"
      >
        <p className="text-xl font-bold">Story Time 📖</p>
        <p className="text-slate-600">Read stories and answer questions together.</p>
      </button>

      {/* 
        Future game suggestions added here as upcoming/coming soon options
      */}
      <div className="mt-8">
        <h2 className="mb-3 text-xl font-bold text-slate-400">Coming Soon...</h2>
        <div className="space-y-3 opacity-60">
          <div className="min-h-12 w-full rounded-2xl border bg-slate-100 p-4 pt-3 pb-3 text-left">
            <p className="text-lg font-bold">Speed Run ⏱️</p>
            <p className="text-sm text-slate-600">
              How many signs can you translate in 60 seconds?
            </p>
          </div>
          <div className="min-h-12 w-full rounded-2xl border bg-slate-100 p-4 pt-3 pb-3 text-left">
            <p className="text-lg font-bold">Sentence Builder 🏗️</p>
            <p className="text-sm text-slate-600">
              Watch a sequence of 3 signs and form the full sentence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
