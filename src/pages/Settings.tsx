import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Settings() {
  const { caregiverMode, enableCaregiverMode, disableCaregiverMode } = useUser();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = enableCaregiverMode(password);
    if (!success) {
      setError('Wrong password. Try again.');
      return;
    }
    setError('');
    setPassword('');
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Settings</h1>
      {!caregiverMode ? (
        <form onSubmit={handleSubmit} className="space-y-2 rounded-2xl border bg-white p-4">
          <p className="text-lg font-bold">Enable Caregiver Mode</p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter caregiver password"
            className="w-full rounded-xl border px-3 py-2"
            aria-label="Caregiver password"
          />
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
          <button
            type="submit"
            className="bg-primary min-h-12 w-full rounded-xl font-bold text-white"
          >
            Enable Caregiver Mode
          </button>
        </form>
      ) : (
        <div className="space-y-2 rounded-2xl border bg-white p-4">
          <p className="text-lg font-bold">Caregiver Mode is enabled</p>
          <button
            type="button"
            onClick={disableCaregiverMode}
            className="min-h-12 w-full rounded-xl border font-bold"
          >
            Disable Caregiver Mode
          </button>
        </div>
      )}
      {caregiverMode && (
        <Link
          to="/caregiver"
          className="bg-primary block min-h-12 rounded-xl px-4 py-3 text-center font-bold text-white"
        >
          Open Caregiver Dashboard
        </Link>
      )}
    </div>
  );
}
