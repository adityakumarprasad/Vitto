// ============================================================
// Button.jsx – Reusable button with variants & loading state
// ============================================================

function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  onClick,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-400 dark:bg-brand-500 dark:hover:bg-brand-400',
    secondary:
      'bg-ink-100 text-ink-800 hover:bg-ink-200 focus:ring-ink-200 dark:bg-ink-800 dark:text-ink-50 dark:hover:bg-ink-700',
    ghost:
      'bg-transparent text-ink-700 hover:bg-ink-100 focus:ring-ink-200 dark:text-ink-100 dark:hover:bg-ink-800',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {/* Tiny spinner when loading */}
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}

export default Button;
