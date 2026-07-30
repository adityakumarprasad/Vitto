// ============================================================
// ErrorPage.jsx – Generic error page for unexpected failures
// ============================================================

import { Link, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

function ErrorPage() {
  const location = useLocation();
  const message = location.state?.message || 'Something went wrong on our side.';

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fadeUp">
      <p className="font-display text-6xl font-bold text-red-600 dark:text-red-400">Error</p>
      <h1 className="mt-3 text-xl font-semibold text-ink-900 dark:text-ink-50">
        We hit a snag
      </h1>
      <p className="mt-2 max-w-md text-sm text-ink-700/70 dark:text-ink-200/60">{message}</p>
      <Link to="/" className="mt-6">
        <Button>Try again</Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
