import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import CategoryCard from '../components/CategoryCard';
import Mascot from '../components/Mascot';

const roles = ['Child with hearing loss', 'Parent', 'Sibling', 'Friend or Classmate', 'Teacher or Caregiver'];

export default function Onboarding() {
    const { updateProfile } = useUser();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [userRole, setUserRole] = useState(roles[0]);
    const [userName, setUserName] = useState('');

    const categories = [...new Set(signs.map((s) => s.category))];

    const finish = (category) => {
        updateProfile({ userName: userName || 'Friend', userRole, onboardingDone: true });
        navigate(`/learn/${encodeURIComponent(category)}`);
    };

    return (
        <div className="space-y-4">
            {step === 0 && (
                <div className="bg-white p-4 rounded-2xl">
                    <h1 className="text-3xl font-extrabold">What is SgSL?</h1>
                    <p className="text-lg">Sign language helps us talk with our hands and hearts 🤝</p>
                    <Mascot message="Let's learn together, one sign at a time." />
                </div>
            )}
            {step === 1 && (
                <div className="bg-white p-4 rounded-2xl">
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
                <div className="bg-white p-4 rounded-2xl">
                    <h2 className="text-3xl font-extrabold">Who are you?</h2>
                    <div className="space-y-2">
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => setUserRole(role)}
                                className={`w-full rounded-xl border px-4 py-3 min-h-12 text-left ${userRole === role ? 'border-primary bg-primary/10' : 'border-slate-300'}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="bg-white p-4 rounded-2xl">
                    <label htmlFor="name" className="font-bold text-xl">
                        What's your name?
                    </label>
                    <input
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full border rounded-xl p-3 mt-2 text-lg"
                    />
                </div>
            )}
            {step === 4 && (
                <div className="bg-white p-4 rounded-2xl">
                    <h2 className="text-3xl font-extrabold">Pick your first topic to learn</h2>
                    <div className="grid gap-2 mt-3">
                        {categories.map((c) => (
                            <CategoryCard key={c} icon="📚" title={c} onClick={() => finish(c)} />
                        ))}
                    </div>
                </div>
            )}
            {step < 4 && (
                <button
                    onClick={() => setStep((s) => s + 1)}
                    className="bg-primary text-white font-bold rounded-xl px-4 py-3 min-h-12 w-full"
                >
                    Next
                </button>
            )}
        </div>
    );
}
