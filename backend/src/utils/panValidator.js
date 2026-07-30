// ============================================================
// panValidator.js – Validate Indian PAN number format
// Format: 5 letters + 4 digits + 1 letter  e.g. ABCDE1234F
// ============================================================

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * Check whether a PAN string matches the official format.
 * @param {string} pan - PAN number (will be uppercased)
 * @returns {boolean}
 */
function isValidPan(pan) {
  if (!pan || typeof pan !== 'string') return false;
  return PAN_REGEX.test(pan.trim().toUpperCase());
}

/**
 * Normalize PAN to uppercase trimmed string.
 * @param {string} pan
 * @returns {string}
 */
function normalizePan(pan) {
  return String(pan || '').trim().toUpperCase();
}

module.exports = {
  isValidPan,
  normalizePan,
  PAN_REGEX,
};
