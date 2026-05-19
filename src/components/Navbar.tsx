import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/learn', label: 'Learn', icon: '📖' },
  { to: '/games', label: 'Games', icon: '🎮' },
  { to: '/progress', label: 'Progress', icon: '📊' },
];

export default function Navbar() {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-red-200 bg-white"
      aria-label="Primary navigation"
    >
      <div className="mx-auto grid max-w-3xl grid-cols-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `min-h-12 px-2 py-3 text-center text-sm font-bold ${isActive ? 'text-primary' : 'text-charcoal'}`
            }
          >
            <span className="block" aria-hidden="true">
              {link.icon}
            </span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
