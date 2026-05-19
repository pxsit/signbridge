import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LearnCategory from './pages/LearnCategory';
import Games from './pages/Games';
import GameSignMatch from './pages/GameSignMatch';
import GameWordHunt from './pages/GameWordHunt';
import GameStoryTime from './pages/GameStoryTime';
import Progress from './pages/Progress';
import CaregiverMode from './pages/CaregiverMode';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import { useUser } from './context/UserContext';

export default function App() {
    const { onboardingDone } = useUser();
    const location = useLocation();
    const hideNav = location.pathname.startsWith('/onboarding');

    return (
        <div className="min-h-screen pb-24">
            <div className="max-w-3xl mx-auto p-4">
                <Routes>
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/" element={onboardingDone ? <Home /> : <Navigate to="/onboarding" replace />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/learn/:category" element={<LearnCategory />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/games/sign-match" element={<GameSignMatch />} />
                    <Route path="/games/word-hunt" element={<GameWordHunt />} />
                    <Route path="/games/story-time" element={<GameStoryTime />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/caregiver" element={<CaregiverMode />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to={onboardingDone ? '/' : '/onboarding'} replace />} />
                </Routes>
            </div>
            {!hideNav && <Navbar />}
        </div>
    );
}
