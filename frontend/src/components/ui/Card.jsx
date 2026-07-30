// ============================================================
// Card.jsx – Reusable surface container (used for interactions)
// ============================================================

function Card({ children, className = '', title, subtitle }) {
  return (
    <section
      className={`rounded-2xl border border-ink-200/70 bg-white/75 p-6 shadow-soft backdrop-blur-sm
        dark:border-ink-700/60 dark:bg-ink-900/60 animate-fadeUp ${className}`}
    >
      {(title || subtitle) && (
        <header className="mb-5">
          {title && (
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-50">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-200/70">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export default Card;
