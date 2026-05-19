import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useUser } from '@/context/UserContext';
import { avatars } from '@/data/avatars';

export default function MainLayout() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/onboarding');
  const hideProfileShortcut = location.pathname === '/profile';
  const { avatarId } = useUser();
  const currentAvatar = avatars.find((avatar) => avatar.id === avatarId) ?? avatars[0];

  return (
    <div className="min-h-screen pb-24">
      {!hideNav && !hideProfileShortcut && (
        <div className="mx-auto flex max-w-3xl justify-end px-4 pt-4">
          <Link
            to="/profile"
            className="rounded-full border bg-white px-3 py-2 text-2xl"
            aria-label="Open profile"
            title="Open profile"
          >
            {currentAvatar.emoji}
          </Link>
        </div>
      )}
      <div className="mx-auto max-w-3xl p-4 pt-2">
        <Outlet />
      </div>
      {!hideNav && <Navbar />}
    </div>
  );
}
