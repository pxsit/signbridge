import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import CategoryCard from '../components/CategoryCard';
import Mascot from '../components/Mascot';

const roles = [
  'Child with hearing loss',
  'Parent',
  'Sibling',
  'Friend or Classmate',
  'Teacher or Caregiver',
];

export default function Onboarding() {
  const { updateProfile } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [userRole, setUserRole] = useState(roles[0]);
  const [userName, setUserName] = useState('');

  const categories = [...new Set(signs.map((s) => s.category))].sort((a, b) => {
    if (a === 'Basics') return -1;
    if (b === 'Basics') return 1;
    return a.localeCompare(b);
  });

  const finish = (category: string) => {
    updateProfile({ userName: userName || 'Friend', userRole, onboardingDone: true });
    navigate(`/learn/${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="rounded-2xl bg-white p-4">
          <h1 className="text-3xl font-extrabold">What is SgSL?</h1>
          <p className="text-lg">Sign language helps us talk with our hands and hearts 🤝</p>
          <Mascot message="Let's learn together, one sign at a time." />
        </div>
      )}
      {step === 1 && (
        <div className="rounded-2xl bg-white p-4">
          <h2 className="text-3xl font-extrabold">How SignBridge helps</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              📖<p>Learn signs</p>
            </div>
            <div>
              🎮<p>Play games</p>
            </div>
            <div>
              📊<p>Track progress</p>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="rounded-2xl bg-white p-4">
          <h2 className="text-3xl font-extrabold">Who are you?</h2>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left ${userRole === role ? 'border-primary bg-primary/10' : 'border-slate-300'}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="rounded-2xl bg-white p-4">
          <label htmlFor="name" className="text-xl font-bold">
            What&apos;s your name?
          </label>
          <input
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3 text-lg"
          />
        </div>
      )}
      {step === 4 && (
        <div className="rounded-2xl bg-white p-4">
          <h2 className="text-3xl font-extrabold">Pick your first topic to learn</h2>
          <p className="mt-1 font-semibold text-slate-700">New here? Start with Basics first.</p>
          <div className="mt-3 grid gap-2">
            {categories.map((c) => (
              <CategoryCard key={c} icon="📚" title={c} onClick={() => finish(c)} />
            ))}
          </div>
        </div>
      )}
      {step < 4 && (
        <button
          onClick={() => setStep((s) => s + 1)}
          className="bg-primary min-h-12 w-full rounded-xl px-4 py-3 font-bold text-white"
        >
          Next
        </button>
      )}
    </div>
  );
}
