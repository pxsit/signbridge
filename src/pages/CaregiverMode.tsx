import { FormEvent, useMemo, useState } from 'react';
import { signs } from '../data/signs';
import { useUser } from '../context/UserContext';
import GifPlaceholder from '../components/GifPlaceholder';

export default function CaregiverMode() {
  const { learnedSigns, sessionLog, caregiverMode, caregiverUnlocked, unlockCaregiver } = useUser();
  const learned = useMemo(() => signs.filter((s) => learnedSigns.has(s.id)), [learnedSigns]);
  const [index, setIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const current = learned[index];

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = unlockCaregiver(password);
    if (!success) {
      setError('Wrong password. Try again.');
      return;
    }
    setError('');
    setPassword('');
  };

  if (!caregiverMode) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold">Parent / Caregiver Mode</h1>
        <section className="rounded-2xl border bg-white p-4">
          <p className="font-semibold">Enable Caregiver Mode in Settings first.</p>
        </section>
      </div>
    );
  }

  if (!caregiverUnlocked) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold">Parent / Caregiver Mode</h1>
        <form onSubmit={handleUnlock} className="space-y-2 rounded-2xl border bg-white p-4">
          <p className="text-lg font-bold">Enter caregiver password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border px-3 py-2"
            aria-label="Caregiver access password"
          />
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
          <button
            type="submit"
            className="bg-primary min-h-12 w-full rounded-xl font-bold text-white"
          >
            Unlock Caregiver Mode
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Parent / Caregiver Mode</h1>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Cheat sheet</h2>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {learned.map((s) => (
            <div key={s.id} className="rounded-xl border p-2">
              <GifPlaceholder word={s.word} size="sm" gifUrl={s.gifUrl} />
              <p className="font-bold">{s.word}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Practice Together</h2>
        {current ? (
          <div className="space-y-2">
            <GifPlaceholder word={current.word} size="lg" gifUrl={current.gifUrl} />
            <p className="text-2xl font-bold">{current.word}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="min-h-12 rounded-xl border"
              >
                ← Previous
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(learned.length - 1, i + 1))}
                className="min-h-12 rounded-xl border"
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          <p>Learn a sign to begin.</p>
        )}
      </section>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Awareness</h2>
        <div className="space-y-2">
          <div className="bg-background rounded-xl p-3">
            How hearing loss affects communication: listening effort can be high, so visual supports
            matter.
          </div>
          <div className="bg-background rounded-xl p-3">
            Tips: face the child, use gestures, pause, and confirm understanding.
          </div>
          <div className="bg-background rounded-xl p-3">
            SgSL matters because it gives children a full language bridge at home and school.
          </div>
        </div>
      </section>
      <section className="rounded-2xl border bg-white p-4">
        <h2 className="text-xl font-bold">Session log</h2>
        {sessionLog.slice(0, 10).map((s, i) => (
          <p key={i} className="text-sm">
            {new Date(s.date).toLocaleString()} - {s.category} ({s.duration} min)
          </p>
        ))}
      </section>
    </div>
  );
}
