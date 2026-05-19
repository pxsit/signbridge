type GifSize = 'sm' | 'md' | 'lg';

interface GifPlaceholderProps {
  word: string;
  size?: GifSize;
  gifUrl?: string | null;
  label?: string;
}

export default function GifPlaceholder({ word, size = 'md', gifUrl, label }: GifPlaceholderProps) {
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
      className={`${sizes[size]} border-primary/60 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white/70 px-3 text-center`}
      role="img"
      aria-label={label || `SgSL GIF placeholder for ${word}`}
    >
      <div className="text-2xl" aria-hidden="true">
        🤟
      </div>
      <p className="text-charcoal font-bold">{word}</p>
    </div>
  );
}
