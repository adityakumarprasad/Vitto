// ============================================================
// Input.jsx – Reusable text / number input with label & error
// ============================================================

/**
 * Controlled by React Hook Form via register() or Controller.
 */
function Input({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  register,
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-ink-700 dark:text-ink-100">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-lg border bg-white/80 px-3 py-2.5 text-sm text-ink-900
          placeholder:text-ink-200 dark:bg-ink-800/80 dark:text-ink-50 dark:border-ink-700
          dark:placeholder:text-ink-200/40 field-focus transition
          ${error ? 'border-red-400' : 'border-ink-200'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        {...(register ? register(name) : {})}
        {...rest}
      />

      {/* Realtime validation message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
