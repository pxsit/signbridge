import GifPlaceholder from './GifPlaceholder';

export default function SignCard({ sign, learned, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl p-3 border border-slate-200 min-h-12 text-left"
            aria-label={`Open ${sign.word} sign details`}
        >
            <div className="flex items-start justify-between gap-2">
                <GifPlaceholder word={sign.word} size="sm" gifUrl={sign.gifUrl} label={sign.gifPlaceholderLabel} />
                <span className="text-xl" aria-label={learned ? 'Learned' : 'Not learned'}>
                    {learned ? '✅' : '⬜'}
                </span>
            </div>
            <p className="mt-2 font-bold text-lg">{sign.word}</p>
        </button>
    );
}
