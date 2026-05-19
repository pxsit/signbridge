import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Settings() {
    const { caregiverMode, toggleCaregiverMode } = useUser();
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-extrabold">Settings</h1>
            <label
                className="bg-white rounded-2xl p-4 border flex items-center justify-between min-h-12"
                htmlFor="caregiver-toggle"
            >
                <span className="font-bold text-lg">Caregiver Mode</span>
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
                    className="block bg-primary text-white rounded-xl px-4 py-3 min-h-12 text-center font-bold"
                >
                    Open Caregiver Dashboard
                </Link>
            )}
        </div>
    );
}
