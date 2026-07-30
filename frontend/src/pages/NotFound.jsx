// ============================================================
// NotFound.jsx – 404 page for unknown client routes
// ============================================================

import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fadeUp">
      <p className="font-display text-7xl font-bold text-brand-600 dark:text-brand-400">404</p>
      <h1 className="mt-3 text-xl font-semibold text-ink-900 dark:text-ink-50">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-700/70 dark:text-ink-200/60">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to Apply</Button>
      </Link>
    </div>
  );
}

export default NotFound;
