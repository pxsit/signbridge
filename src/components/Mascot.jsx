export default function Mascot({ message }) {
    return (
        <div className="bg-amberSoft/30 border border-amberSoft rounded-2xl p-3 flex items-center gap-3" role="note">
            <div
                className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl"
                aria-hidden="true"
            >
                🙂
            </div>
            <p className="font-semibold text-base">{message}</p>
        </div>
    );
}
