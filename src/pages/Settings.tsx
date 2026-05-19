import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Settings() {
  const { caregiverMode, toggleCaregiverMode } = useUser();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Settings</h1>
      <label
        className="flex min-h-12 items-center justify-between rounded-2xl border bg-white p-4"
        htmlFor="caregiver-toggle"
      >
        <span className="text-lg font-bold">Caregiver Mode</span>
        <input
          id="caregiver-toggle"
          type="checkbox"
          checked={caregiverMode}
          onChange={toggleCaregiverMode}
          aria-label="Toggle caregiver mode"
          className="h-6 w-6"
        />
      </label>
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
