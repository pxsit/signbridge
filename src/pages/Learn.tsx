import { useNavigate } from 'react-router-dom';
import { signs } from '../data/signs';
import CategoryCard from '../components/CategoryCard';

export default function Learn() {
  const navigate = useNavigate();
  const categories = [...new Set(signs.map((s) => s.category))];
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-extrabold">Learn SgSL</h1>
      <div className="grid gap-2">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            icon="📘"
            title={category}
            onClick={() => navigate(`/learn/${encodeURIComponent(category)}`)}
          />
        ))}
      </div>
    </div>
  );
}
