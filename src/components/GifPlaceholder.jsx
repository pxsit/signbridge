export default function GifPlaceholder({ word, size = 'md', gifUrl, label }) {
    const sizes = {
        sm: 'h-24 w-24 text-sm',
        md: 'h-36 w-36 text-base',
        lg: 'h-[300px] w-[300px] text-2xl',
    };

    if (gifUrl) {
        return (
            <img
                src={gifUrl}
                alt={label || `SgSL GIF for ${word}`}
                className={`${sizes[size]} rounded-2xl object-cover`}
            />
        );
    }

    return (
        <div
            className={`${sizes[size]} rounded-2xl border-2 border-dashed border-primary/60 bg-white/70 flex flex-col items-center justify-center text-center px-3`}
            role="img"
            aria-label={label || `SgSL GIF placeholder for ${word}`}
        >
            <div className="text-2xl" aria-hidden="true">
                🤟
            </div>
            <p className="font-bold text-charcoal">{word}</p>
        </div>
    );
}
