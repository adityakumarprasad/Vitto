// ============================================================
// Select.jsx – Reusable dropdown with label & error
// ============================================================

function Select({
  label,
  name,
  options = [],
  placeholder = 'Select an option',
  error,
  register,
  disabled = false,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-ink-700 dark:text-ink-100">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        disabled={disabled}
        defaultValue=""
        className={`w-full rounded-lg border bg-white/80 px-3 py-2.5 text-sm text-ink-900
          dark:bg-ink-800/80 dark:text-ink-50 dark:border-ink-700 field-focus transition
          ${error ? 'border-red-400' : 'border-ink-200'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        {...(register ? register(name) : {})}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Select;
