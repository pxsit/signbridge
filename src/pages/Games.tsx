import { useNavigate } from 'react-router-dom';

export default function Games() {
  const navigate = useNavigate();
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-extrabold">Games</h1>
      <button
        onClick={() => navigate('/games/sign-match')}
        className="min-h-12 w-full rounded-2xl border bg-white p-4 text-left"
      >
        <p className="text-xl font-bold">Game 1 - Sign Match</p>
        <p>Match the GIF sign to the right word.</p>
      </button>
      <button
        onClick={() => navigate('/games/word-hunt')}
        className="min-h-12 w-full rounded-2xl border bg-white p-4 text-left"
      >
        <p className="text-xl font-bold">Game 2 - Word Hunt</p>
        <p>Find the right GIF for each word.</p>
      </button>
      <button
        onClick={() => navigate('/games/story-time')}
        className="min-h-12 w-full rounded-2xl border bg-white p-4 text-left"
      >
        <p className="text-xl font-bold">Game 3 - Story Time</p>
        <p>Read stories and answer questions together.</p>
      </button>
    </div>
  );
}
