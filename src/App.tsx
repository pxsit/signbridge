import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Learn from '@/pages/Learn';
import LearnCategory from '@/pages/LearnCategory';
import Games from '@/pages/Games';
import GameSignMatch from '@/pages/GameSignMatch';
import GameWordHunt from '@/pages/GameWordHunt';
import GameStoryTime from '@/pages/GameStoryTime';
import Progress from '@/pages/Progress';
import CaregiverMode from '@/pages/CaregiverMode';
import Onboarding from '@/pages/Onboarding';
import Settings from '@/pages/Settings';
import { useUser } from '@/context/UserContext';

export default function App() {
  const { onboardingDone } = useUser();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={onboardingDone ? <Home /> : <Navigate to="/onboarding" replace />}
        />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:category" element={<LearnCategory />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/sign-match" element={<GameSignMatch />} />
        <Route path="/games/word-hunt" element={<GameWordHunt />} />
        <Route path="/games/story-time" element={<GameStoryTime />} />
        <Route path="/profile" element={<Progress />} />
        <Route path="/progress" element={<Navigate to="/profile" replace />} />
        <Route path="/caregiver" element={<CaregiverMode />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to={onboardingDone ? '/' : '/onboarding'} replace />} />
      </Route>
    </Routes>
  );
}
