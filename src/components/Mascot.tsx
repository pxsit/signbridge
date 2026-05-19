interface MascotProps {
  message: string;
}

export default function Mascot({ message }: MascotProps) {
  return (
    <div
      className="bg-amberSoft/30 border-amberSoft flex items-center gap-3 rounded-2xl border p-3"
      role="note"
    >
      <div
        className="bg-primary flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
        aria-hidden="true"
      >
        🙂
      </div>
      <p className="text-base font-semibold">{message}</p>
    </div>
  );
}
