import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export default function MainLayout() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/onboarding');

  return (
    <div className="min-h-screen pb-24">
      <div className="mx-auto max-w-3xl p-4">
        <Outlet />
      </div>
      {!hideNav && <Navbar />}
    </div>
  );
}
