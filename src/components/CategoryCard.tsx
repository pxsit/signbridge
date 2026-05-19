interface CategoryCardProps {
    icon: string;
    title: string;
    subtitle?: string;
    onClick: () => void;
}

export default function CategoryCard({ icon, title, subtitle, onClick }: CategoryCardProps) {
    return (
        <button onClick={onClick} className="bg-white rounded-2xl border border-slate-200 p-4 text-left min-h-12">
            <div className="text-2xl" aria-hidden="true">
                {icon}
            </div>
            <p className="text-lg font-bold">{title}</p>
            {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </button>
    );
}
