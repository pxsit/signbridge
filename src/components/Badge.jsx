export default function Badge({ badge, earned }) {
    return (
        <div
            className={`rounded-2xl border p-3 text-center ${earned ? 'bg-amberSoft/30 border-amberSoft' : 'bg-slate-100 border-slate-300 opacity-70'}`}
        >
            <div className="text-2xl" aria-hidden="true">
                {earned ? badge.icon : '🔒'}
            </div>
            <p className="font-bold text-sm">{badge.name}</p>
        </div>
    );
}
