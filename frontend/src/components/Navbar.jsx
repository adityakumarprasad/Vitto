// ============================================================
// Navbar.jsx – Top navigation + dark mode toggle
// ============================================================

import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from './ui/Button';

const links = [
  { to: '/', label: 'Apply' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-white/70 backdrop-blur-md dark:border-ink-700/50 dark:bg-ink-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand is a hero-level signal in the shell */}
        <NavLink to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-brand-700 dark:text-brand-300">
            Vitto
          </span>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-ink-700/60 dark:text-ink-200/50 sm:inline">
            MSME Lending
          </span>
        </NavLink>

        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200'
                    : 'text-ink-700 hover:bg-ink-100 dark:text-ink-100 dark:hover:bg-ink-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Button variant="ghost" onClick={toggleTheme} className="ml-1 px-3">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
