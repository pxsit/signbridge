interface ProgressBarProps {
    current: number;
    total: number;
    label: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
    const pct = Math.min(100, Math.round((current / total) * 100));
    return (
        <div aria-label={label}>
            <div className="flex justify-between text-sm font-semibold">
                <span>{label}</span>
                <span>
                    {current}/{total}
                </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full mt-1" aria-hidden="true">
                <div className="h-3 bg-success rounded-full" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}
