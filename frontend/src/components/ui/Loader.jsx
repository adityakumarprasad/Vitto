// ============================================================
// Loader.jsx – Reusable loading spinner / overlay
// ============================================================

function Loader({ label = 'Loading...', fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center gap-3 animate-fadeUp">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600" />
      <p className="text-sm text-ink-700 dark:text-ink-200 animate-pulseSoft">{label}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">{content}</div>
    );
  }

  return content;
}

export default Loader;
