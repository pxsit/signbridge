import { useState } from 'react';
import { signs } from '@/data/signs';
import GifPlaceholder from '@/components/GifPlaceholder';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';

const PAIRS_COUNT = 4; // 8 cards total

const pick = <T,>(arr: T[], n: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

type Card = {
  id: string; // unique card id
  signId: number;
  type: 'word' | 'gif';
  content: string; // either the word or the url/placeholder info
  isMatched: boolean;
  isFlipped: boolean;
};

export default function GameMemoryMatch() {
  const { addGameResult } = useUser();
  const [cards, setCards] = useState<Card[]>(() => {
    const selectedSigns = pick(signs, PAIRS_COUNT);
    const generatedCards: Card[] = [];

    selectedSigns.forEach((sign) => {
      generatedCards.push({
        id: `${sign.id}-word`,
        signId: sign.id,
        type: 'word',
        content: sign.word,
        isMatched: false,
        isFlipped: false,
      });
      generatedCards.push({
        id: `${sign.id}-gif`,
        signId: sign.id,
        type: 'gif',
        content: sign.word,
        isMatched: false,
        isFlipped: false,
      });
    });

    return generatedCards.sort(() => 0.5 - Math.random());
  });
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const isWon = cards.length > 0 && cards.every((c) => c.isMatched);

  const handleCardClick = (targetId: string) => {
    if (isLocked) return;

    const targetCard = cards.find((c) => c.id === targetId);
    if (!targetCard || targetCard.isFlipped || targetCard.isMatched) return;

    // Flip the clicked card immediately
    setCards((prev) => prev.map((c) => (c.id === targetId ? { ...c, isFlipped: true } : c)));

    const newFlipped = [...flippedIds, targetId];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const card1 = cards.find((c) => c.id === newFlipped[0])!;
      const card2 = targetCard; // newly clicked card

      if (card1.signId === card2.signId) {
        // Match!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.signId === card1.signId ? { ...c, isMatched: true } : c))
          );
          setFlippedIds([]);
          setIsLocked(false);
        }, 600);
      } else {
        // No match, flip them back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c))
          );
          setFlippedIds([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  if (isWon) {
    const stars = moves <= PAIRS_COUNT + 2 ? 3 : moves <= PAIRS_COUNT + 5 ? 2 : 1;
    return (
      <div className="mt-10 space-y-4 text-center">
        <h1 className="text-4xl font-extrabold">You Won! 🎉</h1>
        <p className="text-xl">Moves taken: {moves}</p>
        <p className="text-2xl">Stars earned: {'⭐'.repeat(stars)}</p>
        <div className="pt-6">
          <button
            onClick={() => addGameResult('memory-match', stars)}
            className="bg-primary mb-3 min-h-12 w-full rounded-xl px-4 py-3 font-bold text-white"
          >
            Save Result
          </button>
          <Link
            to="/games"
            className="inline-block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center font-bold"
          >
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-extrabold">Memory Match</h1>
        <p className="font-bold text-slate-500">Moves: {moves}</p>
      </div>

      <p className="mb-4 text-slate-600">Find pairs of matching words and their signs.</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => {
          const isVisible = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isVisible || isLocked}
              className={`relative flex min-h-[140px] items-center justify-center overflow-hidden rounded-2xl p-2 transition-all duration-300 ${!isVisible ? 'rotate-0 border-b-4 border-indigo-700 bg-indigo-500 shadow-md hover:bg-indigo-400 active:translate-y-1 active:border-b-0' : 'rotate-y-180 cursor-default border-2 border-indigo-100 bg-white'} ${card.isMatched ? 'opacity-60 grayscale' : ''} `}
            >
              {!isVisible ? (
                <span className="text-4xl">❓</span>
              ) : (
                <div className="animate-fade-in flex h-full w-full items-center justify-center">
                  {card.type === 'word' ? (
                    <span className="px-2 text-center text-xl font-bold break-words">
                      {card.content}
                    </span>
                  ) : (
                    <GifPlaceholder word={card.content} size="sm" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
